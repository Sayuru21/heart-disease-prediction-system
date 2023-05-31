import pandas as pd
import numpy as np
import tensorflow as tf

data = pd.read_csv('heart_data.csv')

# Data cleaning
data = data.dropna()

# Feature scaling
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X = scaler.fit_transform(data.drop('target', axis=1))
y = data['target']

# Split the data into training and testing sets
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the model
model = tf.keras.Sequential([
  tf.keras.layers.Dense(64, input_shape=(X_train.shape[1],), activation='sigmoid'),
  tf.keras.layers.Dense(32, activation='sigmoid'),
  tf.keras.layers.Dense(1, activation='softmax')
])

# Compile the model
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train the model
history = model.fit(X_train, y_train, validation_split=0.2, epochs=100, batch_size=32)

# Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test)
print('Test accuracy:', accuracy)
