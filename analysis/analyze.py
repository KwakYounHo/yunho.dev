import os

from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage
from langchain_core.prompts.chat import HumanMessagePromptTemplate

with open("./prompt_template/assistant.txt", "r", encoding="utf-8") as f:
  assistant_introduction = f.read()

with open("./prompt_template/human.txt", "r", encoding="utf-8") as f:
  human_template = f.read()

llm = ChatOpenAI(
  openai_api_key=os.getenv("OPENAI_API_KEY"),
  temperature=0.7,
  model="gpt-4o-mini",
)

async def analyze(markdown_text):
  try:
    human_message = HumanMessagePromptTemplate.from_template(human_template).format(
      markdown_text=markdown_text
    )
    messages = [
      SystemMessage(content=assistant_introduction),
      human_message
    ]
    feedback = await llm.ainvoke(messages)
    return feedback.content
  except Exception as e:
    print(f"Error: {e}")
    return None
