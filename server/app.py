import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer

app = Flask(__name__)
CORS(app)

# Load the model
# model = tf.keras.models.load_model('path/to/your/model')

tokenizer = Tokenizer(num_words=10000)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_text = data['input']
    print ('input_text : ',input_text)

    # Preprocess input text
    # sequences = tokenizer.texts_to_sequences([input_text])
    # padded_sequences = pad_sequences(sequences, maxlen=100)  # Adjust maxlen accordingly

    # # Make prediction
    # predictions = model.predict(padded_sequences)
    # predicted_text = tokenizer.sequences_to_texts(predictions)

    predicted_text = ["เหตุเกิดเมื่อคืนวันทีทกคมีคนปาขวดแก้วเข้ามาในบ้านตอนประมาณตีสองขวดนึงแล้วก็ปาเข้ามาอีกสองขวดแล้วคนในบ้านก็อเห็นมอเตอร์ไซค์คนที่ต้องสงสัยผ่านเราก็โทรไปก็แจ้งตำรวจตำรวจก็มาแล้วไปถามถึงที่บ้านคนที่เราสงสัยเขาให้การปฎิเสธบอกว่าไม่ได้ขับรถไปไหนเลยทั้งที่มีบ้านนี้บ้านเดียวที่นั่งกินเหล้าอยู่ถึงตีสองตอนก่อเหตุุแล้วก็เป็นบ้านนี้บ้านเดียวที่เราเคยมีปากเสียงด้วยแต่ตำรวจเข้าไปจับที่่ท่อไอเสียปรากฎว่ยังร้อนอยู่แล้วพอหลังจากนั้นคนที่เราว่าเป็นคนที่เราสงสัยก็อยู่ในอาการเมาแล้วมาด่าบ้านเราเสียหายๆแถมตอนที่มาด่าเราถึงหน้าบ้านยังอยู่ในชุดนักศึกษามหาวิทยาลัยด้วยยังอยู่ในอาการเมาด้วยเอาผิดให้ถึงกับไล่ออกจากสถาบันได้ไหมคะพอรุ่งเช้าเราก็ไปแจ้งความลงบันทึกประจำวันเอาไว้แต่ๆๆๆตำรวจบอกว่าไม่ได้เห็นจะจะว่าคนที่ต้องสงสัยเป็นคนปาเอาผิดไม่ได้ถ้าเอาผิดต้องมีหมายศาลไปถึงจะคุมตัวได้แล้วแบบนี้เราไม่ต้องทนโดนมันปาขวดใส่บ้านอีกหลายครั้งหรือคะแล้วแบบนี้คนชั่วก็ลอยนวลสิคะอยากทราบว่าจะเอาผิดอะไรได้กับคนพวกนี้คะ" ]

    # return jsonify({'prediction': predicted_text[0]})
    return jsonify({'prediction': predicted_text[0]})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5510)

# run file python app.py
