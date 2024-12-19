from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor

import os

app = FastAPI()

# 데이터 모델 정의
DB_USER = os.getenv("POSTGRES_USER", "postgres")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
DB_HOST = os.getenv("POSTGRES_HOST", "db-dev")
DB_PORT = os.getenv("POSTGRES_PORT", "5432")
DB_DB = os.getenv("POSTGRES_DB", "postgres")

# 데이터베이스 연결 설정
def get_db_connection():
    return psycopg2.connect(
        dbname=DB_DB,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        cursor_factory=RealDictCursor
    )

@app.get("/lyrics")
def songs():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # song 테이블 전체 조회 (최신순)
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
        print(e)
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
        print(e)
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
        
        return JSONResponse(content={"data": song_content}, status_code=200)
    except Exception as e:
        print(e)
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
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
        cur.close()
