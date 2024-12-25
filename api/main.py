import json
import threading

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel
from utils.db_connection import get_db_connection
from utils.redis_client import add_task, listen_task_result
from utils.logger import get_logger
from contextlib import asynccontextmanager
from utils.web_push import send_notification

logger = get_logger(__name__)

def handle_task_result(function_name: str, target_id: str):
    logger.info(f"[{function_name}] task completed for target_id: {target_id}")
    if function_name == "analyze":
        metadata = {
            "song_id": target_id,
            "primary_key": 201
        }
        message = {
            "title": "해석이 등록되었어요!",
            "body": "등록하신 게시물에 해석이 등록되었어요",
            "icon": "/icon.png",
            "badge": "/icon.png",
            "metadata": metadata
        }
        try:
            conn = get_db_connection()
            cur = conn.cursor()

            cur.execute("SELECT subscription FROM subscriptions")
            subscriptions = cur.fetchall()

            for subscription in subscriptions:
                failed = 0
                try:
                    send_notification(subscription["subscription"], message)
                except Exception as e:
                    failed += 1
                    logger.error(f"Failed to send notification: {e}")
                
            total_notification = len(subscriptions)
            success = total_notification - failed
            logger.info(f"Notification sent to {success}/{total_notification}")
        except Exception as e:
            logger.error(f"[Error] Failed to send notification: {e}")
        finally:
            conn.close()
            cur.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    thread = threading.Thread(target=listen_task_result, args=(handle_task_result,), daemon=True)
    thread.start()
    logger.info("Background tasks started and listening for task results")
    yield
    logger.info("Background tasks stopped")

app = FastAPI(lifespan=lifespan)

@app.get("/lyrics")
def songs():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            SELECT 
                id,
                title,
                artist,
                album_cover as "albumCover"
            FROM song
            ORDER BY created_at DESC
        """)

        songs = cur.fetchall()
        
        if not songs:
            return JSONResponse(content={"data": []}, status_code=200)
        
        return JSONResponse(content={"data": songs}, status_code=200)
        
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
        cur.close()

class SongCreate(BaseModel):
    id: str
    title: str
    artist: str
    albumCover: str
    lyrics: str

@app.post("/lyrics")
async def create_song(request: SongCreate):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute(
            "CALL create_song_with_content(%s, %s, %s, %s, %s)",
            (request.id, request.title, request.artist, request.albumCover, request.lyrics)
        )
        
        cur.execute(
            "SELECT id, title, artist, album_cover as \"albumCover\" FROM song WHERE id = %s",
            (request.id,)
        )
        created_song = cur.fetchone()
        
        conn.commit()
        
        return JSONResponse(
            content={"data": created_song},
            status_code=201
        )
        
    except Exception as e:
        logger.error(e)
    finally:
        conn.close()
        cur.close()

@app.get("/lyrics/{id}")
def lyrics(id: str):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            SELECT 
                id,
                lyrics,
                analysis,
                generate_state as "generateState"
            FROM c_content 
            WHERE id = %s
        """, (id,))
        song_content = cur.fetchone()

        if song_content["generateState"] == 0:
            add_task("analyze", {"song_id": id})
            cur.execute("UPDATE c_content SET generate_state = 1 WHERE id = %s", (id,))
            logger.info(f"Added analyze task to task queue id:{id}")
        
        return JSONResponse(content={"data": song_content}, status_code=200)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
        cur.close()

class ImpressiveRequest(BaseModel):
    text: str

@app.post("/impressive")
async def create_impressive(request: ImpressiveRequest):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("INSERT INTO impressive (text) VALUES (%s)", (request.text,))
        conn.commit()
        
        return JSONResponse(content={"data": "done"}, status_code=201)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
        cur.close()

class SubscriptionKeys(BaseModel):
    p256dh: str
    auth: str
class SubscriptionRequest(BaseModel):
    endpoint: str
    keys: SubscriptionKeys

@app.post("/subscription")
async def create_subscription(request: SubscriptionRequest):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("INSERT INTO subscriptions (subscription) VALUES (%s)", (json.dumps(request.model_dump()),))
        conn.commit()

        return JSONResponse(content={"data": "done"}, status_code=201)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
        cur.close()


class SubscriptionDeleteRequest(BaseModel):
    endpoint: str

@app.put("/subscription")
async def delete_subscription(request: SubscriptionDeleteRequest):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("DELETE FROM subscriptions WHERE subscription->>'endpoint' = %s", (request.endpoint,))
        conn.commit()
        
        return Response(status_code=204)
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
        cur.close()
