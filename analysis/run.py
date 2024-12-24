import utils.logger
from task_queue import task_worker

logger = utils.logger.getLogger(__name__)

if __name__ == "__main__":
    logger.info("task_worker Service start")
    task_worker()
