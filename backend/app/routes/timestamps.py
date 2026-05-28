from fastapi import APIRouter

from pydantic import BaseModel

import json
import os


router = APIRouter()


class TimestampRequest(BaseModel):
    file_id: str
    topic: str


@router.post("/timestamps")
def get_timestamps(req: TimestampRequest):

    file_path = (
        f"vectors/"
        f"{req.file_id}_timestamps.json"
    )

    if not os.path.exists(file_path):

        return {
            "timestamps": []
        }

    with open(file_path, "r") as f:

        timestamps = json.load(f)

    matched = []

    for item in timestamps:

        if req.topic.lower() in item["text"].lower():

            matched.append(item)

    return {
        "timestamps": matched
    }