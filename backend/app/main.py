from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload
from app.routes import chat
from app.routes import summary
from app.routes import timestamps
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


# CORS CONFIGURATION
origins = [
    "http://localhost:3000",
    "https://ai-multimedia-qa-ochre.vercel.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(upload.router)
app.include_router(chat.router)
app.include_router(summary.router)
app.include_router(timestamps.router)


@app.get("/")
def home():
    return {
        "message": "AI Multimedia Q&A Backend Running"
    }