from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
import torch
import uvicorn

app = FastAPI()

# Detecta se a GPU está disponível
device = "cuda" if torch.cuda.is_available() else "cpu"

# Configuração do modelo de embedding com uso de GPU
Settings.embed_model = HuggingFaceEmbedding(
    model_name="BAAI/bge-base-en-v1.5",
    device=device
)
print(device)

# Configuração do LLM Ollama
Settings.llm = Ollama(
    model="llama3.2",
    base_url="http://ollama:11434",
    request_timeout=360.0,
    context_window=8000,
    temparature=0.2
)

# Carrega documentos e cria índice
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

# Modelo da requisição
class QuestionRequest(BaseModel):
    question: str

@app.post("/question")
async def ask_question(request: QuestionRequest):
    try:
        response = await query_engine.aquery(request.question)
        return {"response": str(response)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

