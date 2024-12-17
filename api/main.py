import json
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/lyrics")
def songs():
  with open("temp/song.json", "r") as f:
    data = json.load(f)
    f.close()
    return JSONResponse(content=data)
