import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

data = pd.read_csv('heart_data_303_column_6.csv')

# Data cleaning
data = data.dropna()

# Feature scaling
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X = scaler.fit_transform(data.drop('target', axis=1))
y = data['target']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the model
dt = DecisionTreeClassifier(max_depth=3, random_state=42)

# Train the model
dt.fit(X_train, y_train)

# Make predictions on the testing data
y_pred = dt.predict(X_test)

# Calculate the training accuracy
train_accuracy = dt.score(X_train, y_train)

# Evaluate the model's accuracy
accuracy = accuracy_score(y_test, y_pred)
print('Test accuracy:', accuracy)

# Calculate the noise
noise = train_accuracy - accuracy
print('Training accuracy:', train_accuracy)
print('Noise:', noise)