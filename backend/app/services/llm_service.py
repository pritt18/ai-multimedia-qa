import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq

from langchain_community.vectorstores import FAISS

from langchain_community.embeddings import HuggingFaceEmbeddings


load_dotenv()


llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    groq_api_key=os.getenv("GROQ_API_KEY")
)


embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def ask_question(file_id, question):

    vectorstore = FAISS.load_local(
        f"vectors/{file_id}",
        embedding,
        allow_dangerous_deserialization=True
    )

    docs = vectorstore.similarity_search(
        question,
        k=3
    )

    context = "\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
    Answer the question only using the provided context.

    Context:
    {context}

    Question:
    {question}
    """

    response = llm.invoke(prompt)

    return response.content