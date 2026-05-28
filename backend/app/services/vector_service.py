from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from langchain_community.vectorstores import FAISS

from langchain_community.embeddings import (
    HuggingFaceEmbeddings
)


def get_embedding():

    return HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )


def create_vector_store(
    text,
    file_id
):

    text_splitter = (
        RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=100
        )
    )

    chunks = text_splitter.split_text(text)

    embedding = get_embedding()

    vector_store = FAISS.from_texts(
        chunks,
        embedding
    )

    vector_store.save_local(
        f"vectors/{file_id}"
    )


def load_vector_store(
    file_id
):

    embedding = get_embedding()

    return FAISS.load_local(
        f"vectors/{file_id}",
        embedding,
        allow_dangerous_deserialization=True
    )