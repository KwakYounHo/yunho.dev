import uvicorn
import os

mode = os.getenv("DEPLOY_MODE", "production")
reload_mode = mode != "production"

if __name__ == "__main__":
  uvicorn.run("main:app", host="0.0.0.0", port=8000, workers=4, reload=reload_mode)