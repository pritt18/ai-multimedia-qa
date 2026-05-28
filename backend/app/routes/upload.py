from fastapi import APIRouter, UploadFile, File

import shutil
import uuid
import os
import json

from app.services.pdf_service import extract_pdf_text
from app.services.whisper_service import transcribe_audio
from app.services.vector_service import create_vector_store


router = APIRouter()


UPLOAD_DIR = "uploads"


os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs("vectors", exist_ok=True)


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    file_id = str(uuid.uuid4())

    # Safe filename
    safe_filename = (
        file.filename
        .replace(" ", "_")
        .replace("(", "")
        .replace(")", "")
    )

    file_path = (
        f"{UPLOAD_DIR}/"
        f"{file_id}_{safe_filename}"
    )

    # Save uploaded file
    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    ext = file.filename.split(".")[-1].lower()

    text = ""

    timestamps = []

    # PDF Processing
    if ext == "pdf":

        text = extract_pdf_text(
            file_path
        )

    # Audio/Video Processing
    elif ext in ["mp3", "mp4", "wav"]:

        text, timestamps = transcribe_audio(
            file_path
        )

    else:

        return {
            "message":
            "Unsupported file type. Upload PDF, MP3, MP4, or WAV."
        }

    # Create FAISS vector store
    create_vector_store(
        text,
        file_id
    )

    # Save timestamps
    with open(
        f"vectors/{file_id}_timestamps.json",
        "w"
    ) as f:

        json.dump(
            timestamps,
            f
        )

    return {
        "file_id": file_id,
        "message": "File uploaded successfully",
        "timestamps": timestamps,
        "file_path": file_path
    }