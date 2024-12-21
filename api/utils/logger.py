import logging

def setup_logger():
  logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [%(levelname)s] - %(message)s'
  )

def get_logger(name):
  return logging.getLogger(name)

setup_logger()
