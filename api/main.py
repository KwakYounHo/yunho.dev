from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor

import os

app = FastAPI()

# 데이터 모델 정의
class SongCreate(BaseModel):
    id: str
    title: str
    artist: str
    albumCover: str
    lyrics: str

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
        
        cur.close()
        conn.close()

        if not songs:
            return JSONResponse(content={"data": []}, status_code=200)
        
        return JSONResponse(content={"data": songs}, status_code=200)
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/lyrics")
async def create_song(request: Request):
    try:
        # 요청 본문을 JSON으로 파싱
        body = await request.json()
        # Pydantic 모델로 변환
        song = SongCreate(**body)
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 프로시저 호출
        cur.execute(
            "CALL create_song_with_content(%s, %s, %s, %s, %s)",
            (song.id, song.title, song.artist, song.albumCover, song.lyrics)
        )
        
        # song 테이블에서 생성된 데이터 조회
        cur.execute(
            "SELECT id, title, artist, album_cover as \"albumCover\" FROM song WHERE id = %s",
            (song.id,)
        )
        created_song = cur.fetchone()
        
        conn.commit()
        cur.close()
        conn.close()
        
        return JSONResponse(
            content={"data": created_song},
            status_code=201
        )
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

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
        
        cur.close()
        conn.close()
        
        return JSONResponse(content={"data": song_content}, status_code=200)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/impressive")
async def create_impressive(request: Request):
    try:
        body = await request.json()
        text = body.get("text")
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("INSERT INTO impressive (text) VALUES (%s)", (text,))
        conn.commit()
        cur.close()
        conn.close()
        
        return JSONResponse(content={"data": "done"}, status_code=201)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
