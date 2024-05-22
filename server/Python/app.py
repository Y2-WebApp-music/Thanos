import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.vectorstores import FAISS

# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from tensorflow.keras.preprocessing.text import Tokenizer

app = Flask(__name__)
CORS(app)

# Load the model
# model = tf.keras.models.load_model('path/to/your/model')

# tokenizer = Tokenizer(num_words=10000)


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

    # similarity_search_by_vector
    embedding_vector = embedding.embed_query(question)
    docs_vs = vectorstore.similarity_search_by_vector(embedding_vector, 20)
    unique_predictions = set()  # Create an empty set to store unique predictions
    for i in docs_vs:
        # print(i.metadata["row"]) ใช้แค่อันนี้เอาไปเก็บใน list แล้วบอกแค่อันที่ไม่ซ้ำ
        unique_predictions.add(i.metadata["row"])
        # print(i.page_content)

    predicted_text = list(unique_predictions)  # Convert the set to a list for the response
    print('predicted_text : ',predicted_text)

    return jsonify({"prediction": predicted_text})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5510)

# run file python app.py

# pip install langchain sentence-transformers faiss langchain-community faiss-cpu
# pip install -U langchain-community
# /Library/Frameworks/Python.framework/Versions/3.10/bin/python3 app.py