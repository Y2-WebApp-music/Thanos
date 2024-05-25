import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from collections import Counter
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.vectorstores import FAISS
from langchain_community.llms import Ollama
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough

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

    template = """
    <|start_header_id|>system<|end_header_id|>
    You are the best Civil and Commercial Lawer that ever existed.\n
    Civil law and commercial law of Thailand covers debt, contracts, property, family and inheritance.\n
    Anything beyond your domain You definitely won't know include include traffic, labor, criminal.\n
    Use the following law to answer how the law relates to the context.\n\n

    Follow these instructions:\n
    - Tell what laws relates to the context.\n
    - Answer with law that relates to the context
    - You don't understand any other language except Thai.\n
    - You need to answer in Thai language only.\n
    - The answer must be in this format:\n
        ข้อกฎหมายที่เกี่ยวข้อง: laws (laws that relates to this context)\n
        คำอธิบายกฎหมาย: (Explanation of each laws base on the context)\n\n
    - Use five sentences maximum and keep the answer as concise as possible.\n
    - Do not give superfluous and baffling explanations.\n
    - The answer must feel confident in your own knowledge.\n
    - If you don't know the answer, just say that you don't know, don't try to make up an answer.\n
    - Don't include extraneous information in your explanation.\n\n

    If you found the laws that irrelevant or unrelated with the context, follow these instruction:\n
    - Things that may be encountered include traffic, labor, criminal and etc.\n
    - Please answer with "ไม่พบกฎหมายที่เกี่ยวข้อง หรืออาจจะมีความเกี่ยวข้องกับข้อกฎหมายอื่นนอกจากประมวลกฎหมายแพ่งและพาณิชย์".\n
    - The best answer of this case is "ไม่พบกฎหมายที่เกี่ยวข้อง หรืออาจจะมีความเกี่ยวข้องกับข้อกฎหมายอื่นนอกจากประมวลกฎหมายแพ่งและพาณิชย์".\n\n

    This is laws information:\n
    {laws}\n\n
    <|eot_id|>

    <|start_header_id|>user<|end_header_id|>
    Context: {context}\n\n
    Civil law and commercial law covers only debt, contracts, property, family and inheritance.\n
    Things that beyond your domain include include traffic, labor, criminal.\n
    Please answer in Thai language.\n
    Don't answer in any other language except Thai.\n\n
    <|eot_id|>

    <|start_header_id|>assistant<|end_header_id|>
    Answer:
    <|eot_id|>
    """

    custom_rag_prompt = PromptTemplate.from_template(template)

    ccc = pd.read_csv("./Data/ccc-datasets.csv")

    def count_and_sort_labels(input_list):
        counts = Counter(input_list)
        total_count = len(input_list)
        labels = sorted(counts.keys(), key=lambda item: counts[item], reverse=True)

        return labels
    
    def format_docs(docs):
        laws = []
        for doc in docs:
            law = doc.metadata['row']
            laws.append(law)
        laws = count_and_sort_labels(laws)

        if laws[0] == 0:
            return 'ไม่พบกฎหมายที่เกี่ยวข้อง หรืออาจจะมีความเกี่ยวข้องกับข้อกฎหมายอื่นนอกจากประมวลกฎหมายแพ่งและพาณิชย์'

        article = []
        for law in laws:
            context = ccc[ccc['Legal'] == law]['Statement'].to_list()
            if len(context) > 0:
                article.append(context[0])
        return '\n\n'.join(article)

    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 20})

    llm = Ollama(
        model="llama3",
        temperature=0,
        )

    chain = (
        {"laws": retriever | format_docs, "context": RunnablePassthrough()}
        | custom_rag_prompt
        | llm
        | StrOutputParser()
    )

    predicted_text = chain.invoke(question)
    
    return jsonify({"prediction": predicted_text})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5510)