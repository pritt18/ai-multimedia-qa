import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq

from app.services.vector_service import (
    load_vector_store
)


load_dotenv()


llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama3-8b-8192"
)


def ask_question(
    file_id,
    question
):

    vector_store = load_vector_store(
        file_id
    )

    docs = vector_store.similarity_search(
        question,
        k=3
    )

    context = "\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
    Answer the question based on the context below.

    Context:
    {context}

    Question:
    {question}
    """

    response = llm.invoke(prompt)

    return response.content