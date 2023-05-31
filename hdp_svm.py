# -*- coding: utf-8 -*-
"""HDP_SVM

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/14F68Obt3iJ1XaFUuFzZOFIwrqmtgIPmc
"""
import warnings
warnings.filterwarnings("ignore", message="X does not have valid feature names, but SVC was fitted with feature names")
#
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


heart_data = pd.read_csv('heart_data.csv')

X = heart_data.drop(columns = 'target', axis = 1)
Y = heart_data['target']

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.2, stratify = Y, random_state = 2)

# Training the SVM model with training data
model_svm.fit(X_train, Y_train)

# Evaluating the SVM model
# Accuracy on training data
X_train_prediction_svm = model_svm.predict(X_train)
training_data_accuracy_svm = accuracy_score(X_train_prediction_svm, Y_train) * 100
# print('Accuracy on Training data (SVM): {:.2f}%'.format(training_data_accuracy_svm))

# Accuracy on test data
X_test_prediction_svm = model_svm.predict(X_test)
test_data_accuracy_svm = accuracy_score(X_test_prediction_svm, Y_test) * 100
# print('Accuracy on Test data (SVM): {:.2f}%'.format(test_data_accuracy_svm))


input_data = (46,1,0,120,249,0)
#
# # input_data = input_array
# # change the input data to a numpy array
input_data_as_numpy_array = np.asarray(input_data)
#
# # reshape the numpy array as we are predicting for only one instance
input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
#
# # Making predictions using the SVM model
prediction_svm = model_svm.predict(input_data_reshaped)
#
# import pickle
#
# with open('model_pickle','wb') as f:
#     pickle.dump(model_svm, f)
# output_json = json.dumps(input_array)
# print("Hello")

print(prediction_svm)

# if(prediction_svm[0] == 0):
#     print('The person does not have a Heart Disease')
# else:
#   print('The person has a Heart Disease')
# with open('model_pickle','rb') as f:
#  mp = pickle.load(f)

# pre = mp.predict(input_data_reshaped)
# print(pre)