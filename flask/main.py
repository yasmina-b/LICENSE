import pickle

import numpy as np
import tensorflow as tf
from PIL import Image
from flask import Flask, request
from keras.utils import img_to_array

app = Flask(__name__)
global model
global encoder
global knn
global index_mapping


def load_model():
    global model
    global encoder
    model_path = r'./models/autoencoder_fashion_dataset.h5'
    model = tf.keras.models.load_model(model_path)
    encoder = tf.keras.models.Model(model.input, model.get_layer('latent_space').output)


def load_knn():
    global knn
    knn_path = r'./models/knnpickle_file.pickle'
    knn = pickle.load(open(knn_path, 'rb'))


def load_index_mapping():
    global index_mapping
    index_mapping_path = r'./models/indices_file.txt'
    with open(index_mapping_path) as fp:
        index_mapping = []
        for line in fp:
            index_mapping.append(line.split('\\')[-1][:-1])


def get_processed_img(image_file, size=(64, 64)):
    image = Image.open(image_file.stream)
    image = image.resize(size)
    image = img_to_array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image


def encode(image):
    global encoder
    encoded_image = encoder.predict(image)
    encoded_image = np.resize(encoded_image, 16)
    return encoded_image


def predict_neighbours(encoding):
    global knn
    global index_mapping
    neighbors = knn.kneighbors(encoding, 3, False)
    index_neighbours_mapped = []
    for n in neighbors[0]:
        index_neighbours_mapped.append(index_mapping[n])
    return index_neighbours_mapped


@app.route('/upload', methods=['POST'])
def upload():
    try:
        image_file = request.files.get('image')
        processed_image = get_processed_img(image_file)
        encoded_image = encode(processed_image)
        neighbours = predict_neighbours([encoded_image])
        print("Neighbours ", neighbours)
        return neighbours, 200
    except Exception as err:
        print("Error while processing request ", err)
        return 'Error', 500


load_model()
load_knn()
load_index_mapping()
app.run(host='0.0.0.0', port=81)
