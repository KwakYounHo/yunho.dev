import os
import redis
import json

from typing import List
from utils.web_push import send_notification
from utils.logger import get_logger
from pydantic import BaseModel

logger = get_logger(__name__)

REDIS_HOST = os.getenv("REDIS_HOST", "cache-dev")
REDIS_PORT = os.getenv("REDIS_PORT", "6400")

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

def add_task(function_name, args):
  task_data = {
    "function_name": function_name,
    "args": args
  }
  redis_client.rpush("task_queue", json.dumps(task_data))

def listen_task_result(callback):
  while True:
    task = redis_client.blpop("task_result", timeout=0)
    if task:
      task_result_data = json.loads(task[1])
      if task_result_data["function_name"] == "analyze":
        if task_result_data["result"] == "success":
          callback(task_result_data["function_name"], task_result_data["target_id"])
        else:
          continue
