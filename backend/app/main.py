from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles

from app.routes import upload
from app.routes import chat
from app.routes import summary
from app.routes import timestamps


app = FastAPI(
    title="AI Multimedia Q&A"
)


# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Static File Serving
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


# API Routes
app.include_router(upload.router)

app.include_router(chat.router)

app.include_router(summary.router)

app.include_router(timestamps.router)


@app.get("/")
def home():

    return {
        "message": "Backend Running"
    }