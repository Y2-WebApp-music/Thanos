import numpy as np
import tensorflow as tf  # Or import torch
from flask import Flask, jsonify, request

app = Flask(__name__)

# Load your model
model = tf.keras.models.load_model('my_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    predictions = model.predict(np.array(data['inputs']))
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    app.run(debug=True)
