from flask import Flask, request, jsonify
import warnings

warnings.filterwarnings("ignore", message="X does not have valid feature names, but SVC was fitted with feature names")

# Importing the Support Vector Classifier
from sklearn.svm import SVC
# useful when working with arrays
import numpy as np
# useful when manipulating tabular data in DataFrames
import pandas as pd
# use to split arrays or matrices into random train and test subsets
from sklearn.model_selection import train_test_split
# Logistic Regression classifier
from sklearn.linear_model import LogisticRegression
# used to computes the accuracy
from sklearn.metrics import accuracy_score

# Creating an instance of SVC
model_svm = SVC()

import pickle

app = Flask(__name__)


@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json

    age = data['age']
    blood_pressure = data['bloodPressure']
    blood_sugar = data['bloodSugar']
    chest_pain = data['chestPain']
    cholesterol = data['cholesterol']
    sex = data['sex']

    # Create a Python array and append the values
    # heart_array = [age, sex, chest_pain, blood_pressure, cholesterol, blood_sugar]
    input_data = (age, sex, chest_pain, blood_pressure, cholesterol, blood_sugar)
    #
    # # input_data = input_array
    # # change the input data to a numpy array
    # input_data_as_numpy_array = np.asarray(input_data)
    #
    # # reshape the numpy array as we are predicting for only one instance
    # input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

    with open('el_svm_pickle', 'rb') as f:
        mp = pickle.load(f)

    # input_data = (34, 0, 1, 118, 210, 0)
    input_df = pd.DataFrame([input_data], columns=["age","sex", "cp","trestbps","chol","fbs"])

    pre = mp.predict(input_df)
    # print(pre)
    predict = pre.tolist()

    prediction = predict  # replace with your actual prediction
    response = {'prediction': prediction}
    return jsonify(response)


if __name__ == '__main__':
    app.run()
