import os
import json

from pywebpush import webpush, WebPushException
from utils.logger import get_logger
from urllib.parse import urlparse

logger = get_logger(__name__)

VAPID_PRIVATE_KEY = os.getenv("VAPID_PRIVATE_KEY")
WEBPUSH_SUBJECT = os.getenv("WEBPUSH_SUBJECT")



def send_notification(subscription, message):
  parsed_url = urlparse(subscription["endpoint"])
  aud = f"{parsed_url.scheme}://{parsed_url.netloc}"
  try:
    webpush(
      subscription_info=subscription,
      data=json.dumps(message),
      vapid_private_key=VAPID_PRIVATE_KEY,
      vapid_claims={
        "sub": WEBPUSH_SUBJECT,
        "aud": aud
      }
    )
    logger.info("Notification sent successfully")
  except WebPushException as e:
    logger.error(f"WebPushException: {e}")
    raise e
