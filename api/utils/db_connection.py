import os
import psycopg2
from psycopg2.extras import RealDictCursor

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
