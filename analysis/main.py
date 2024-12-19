import os
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from psycopg2.extras import RealDictCursor
import psycopg2

from analyze import analyze

app = FastAPI()

DB_USER = os.getenv("POSTGRES_USER", "postgres")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
DB_HOST = os.getenv("POSTGRES_HOST", "db-dev")
DB_PORT = os.getenv("POSTGRES_PORT", "5432")
DB_DB = os.getenv("POSTGRES_DB", "postgres")

def get_db_connection():
  return psycopg2.connect(
    dbname=DB_DB,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT,
    cursor_factory=RealDictCursor
  )

class AnalyzeRequest(BaseModel):
  song_id: str

@app.post("/analyze")
async def analyze_endpoint(req: AnalyzeRequest):
  try:
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
      SELECT generate_state FROM c_content WHERE id = %s
    """, (req.song_id,))

    prev_state = cur.fetchone()

    if prev_state["generate_state"] > 0:
      return JSONResponse(content={"error": "already analyzed"}, status_code=400)
    
    cur.execute("""
      UPDATE c_content SET generate_state = 1 WHERE id = %s
    """, (req.song_id,))
    conn.commit()

    cur.execute("""
      SELECT lyrics FROM c_content WHERE id = %s
    """, (req.song_id,))
    lyrics = cur.fetchone()

    feedback = await analyze(lyrics["lyrics"])

    cur.execute("""
      UPDATE c_content SET analysis = %s, generate_state = 2 WHERE id = %s
    """, (feedback, req.song_id))
    conn.commit()

    return JSONResponse(content={"message": "Analysis completed"}, status_code=200)
  except Exception as e:
    cur.execute("""
      UPDATE c_content SET generate_state = 0 WHERE id = %s
    """, (req.song_id,))
    conn.commit()
    return JSONResponse(content={"error": str(e)}, status_code=500)
  finally:
    conn.close()
    cur.close()

