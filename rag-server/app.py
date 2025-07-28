from flask import Flask, request, jsonify
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
import asyncio

app = Flask(__name__)

# Configura embeddings e LLM
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
Settings.llm = Ollama(
    model="llama3.2",
    base_url="http://ollama:11434",
    request_timeout=360.0,
    context_window=8000,
)

# Carrega documentos e cria índice
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

@app.route("/question", methods=["POST"])
def ask():
    data = request.json
    pergunta = data.get("question")
    if not pergunta:
        return jsonify({"error": "Campo 'question' é obrigatório"}), 400

    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        resposta = loop.run_until_complete(query_engine.aquery(pergunta))
        loop.close()
        return jsonify({"response": str(resposta)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
