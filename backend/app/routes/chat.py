from fastapi import APIRouter
from pydantic import BaseModel

from app.services.llm_service import ask_question

router = APIRouter()

class ChatRequest(BaseModel):
    file_id: str
    question: str

@router.post("/chat")

def chat(req: ChatRequest):

    answer = ask_question(
        req.file_id,
        req.question
    )

    return {
        "answer": answer
    }