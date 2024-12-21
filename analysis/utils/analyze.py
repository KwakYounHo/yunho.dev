import os

from utils.logger import getLogger

from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage
from langchain_core.prompts.chat import HumanMessagePromptTemplate

logger = getLogger(__name__)

with open("prompt_template/assistant.txt", "r", encoding="utf-8") as f:
  assistant_introduction = f.read()

with open("prompt_template/human.txt", "r", encoding="utf-8") as f:
  human_template = f.read()

llm = ChatOpenAI(
  openai_api_key=os.getenv("OPENAI_API_KEY"),
  temperature=0.7,
  model="gpt-4o-mini",
)

def analyze(markdown_text):
  try:
    human_message = HumanMessagePromptTemplate.from_template(human_template).format(
      markdown_text=markdown_text
    )
    messages = [
      SystemMessage(content=assistant_introduction),
      human_message
    ]
    feedback = llm.invoke(messages)
    return feedback.content
  except Exception as e:
    logger.error(f"Error: {e}")
    return None
