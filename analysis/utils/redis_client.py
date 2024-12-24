import os
import redis
import json

from utils.logger import getLogger

logger = getLogger(__name__)

REDIS_HOST = os.getenv("REDIS_HOST", "cache-dev")
REDIS_PORT = os.getenv("REDIS_PORT", "6400")

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

def task_result(function_name, target_id, result):
  task_data = {
    "function_name": function_name,
    "target_id": target_id,
    "result": result
  }
  redis_client.rpush("task_result", json.dumps(task_data))
  logger.info("task result pushed")
