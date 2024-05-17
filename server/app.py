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

    predicted_text = ["Checking send prediction" ]

    # return jsonify({'prediction': predicted_text[0]})
    return jsonify({'prediction': predicted_text[0]})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5510)

# run file python app.py
