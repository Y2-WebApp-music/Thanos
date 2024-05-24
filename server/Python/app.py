import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.vectorstores import FAISS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.get("/")
def home():
    return "Hello from python server Flask"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    question = data["input"]
    embedding = SentenceTransformerEmbeddings(
        model_name="intfloat/multilingual-e5-large"
    )

    db_path = "./Data/vectorstore_intfloat.db"

    vectorstore = FAISS.load_local(
        db_path, embedding, allow_dangerous_deserialization=True
    )

    embedding_vector = embedding.embed_query(question)
    docs_vs = vectorstore.similarity_search_by_vector(embedding_vector, 20)
    unique_predictions = set()
    for i in docs_vs:
        unique_predictions.add(i.metadata["row"])

    predicted_text = list(unique_predictions)
    print('predicted_text : ',predicted_text)

    return jsonify({"prediction": predicted_text})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5510)