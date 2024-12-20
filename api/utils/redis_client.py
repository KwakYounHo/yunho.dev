import os
import redis
import json

REDIS_HOST = os.getenv("REDIS_HOST", "cache-dev")
REDIS_PORT = os.getenv("REDIS_PORT", "6400")

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

def add_task(function_name, args):
  task_data = {
    "function_name": function_name,
    "args": args
  }
  redis_client.rpush("task_queue", json.dumps(task_data))
