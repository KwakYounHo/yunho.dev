import time
import json
import utils.logger

from utils.db_connection import get_db_connection
from utils.analyze import analyze
from utils.redis_client import redis_client, task_result

logger = utils.logger.getLogger(__name__)

def task_worker():
  logger.info("task_worker start")
  while True:
    task = redis_client.blpop("task_queue", timeout=0)
    if task:
      task_data = json.loads(task[1])
      function_name = task_data["function_name"]
      args = task_data["args"]
      logger.info(f"task received | Task function: {function_name}")

      if function_name == "analyze":
        try:
          analyze_start = time.time()
          logger.info(f"[analyze] request accepted {args['song_id']}")
          conn = get_db_connection()
          cur = conn.cursor()
          cur.execute("SELECT lyrics, generate_state FROM c_content WHERE id = %s", (args["song_id"],))
          result = cur.fetchone()
          
          if result["generate_state"] > 0:
              logger.error(f"[ERROR] {args['song_id']} already analyzed")
              continue

          logger.info(f"[analyze] processing, set generate_state to 1, id: {args['song_id']}")
          cur.execute("UPDATE c_content SET generate_state = 1 WHERE id = %s", (args["song_id"],))
          conn.commit()

          feedback = analyze(result["lyrics"])
          
          cur.execute("UPDATE c_content SET analysis = %s, generate_state = 2 WHERE id = %s", (feedback, args["song_id"]))
          logger.info(f"[analyze] was done successfully, set generate_state to 2, id: {args['song_id']}")
          conn.commit()
          task_result("analyze", args["song_id"], "success")
          analyze_end = time.time()
          logger.info(f"[analyze] Task was done successfully, time: {round(analyze_end - analyze_start, 3)}s")

        except Exception as e:
          logger.error(f"[Error] {e}")
          logger.info(f"[analyze] set generate_state to 0 with error, id: {args['song_id']}")
          cur.execute("UPDATE c_content SET generate_state = 0 WHERE id = %s", (args["song_id"],))
          conn.commit()
          logger.info(f"[analyze] push task_queue with error, id: {args['song_id']}")
          task_result("analyze", args["song_id"], "error")
          redis_client.rpush("task_queue", json.dumps({"function_name": "analyze", "args": {"song_id": args["song_id"]}}))
        finally:
          if conn:
              conn.close()
          if cur:
              cur.close()
