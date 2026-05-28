from fastapi import APIRouter
from pydantic import BaseModel

from app.services.llm_service import ask_question


router = APIRouter()


class SummaryRequest(BaseModel):
    file_id: str


@router.post("/summary")
def summarize(req: SummaryRequest):

    summary = ask_question(
        req.file_id,
        """
        Give a professional summary of this document.
        Include:
        - main topics
        - skills
        - technologies
        - important highlights
        """
    )

    return {
        "summary": summary
    }