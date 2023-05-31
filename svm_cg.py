import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix
import pickle
import time

data = pd.read_csv('heart_data.csv')

X = data.drop('target', axis=1)
y = data['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

svc = SVC(kernel='linear')

# Record start time
start_time = time.time()

svc.fit(X_train, y_train)

# Record end time
end_time = time.time()

# input_data = (34, 0, 1, 118, 210, 0)
# input_df = pd.DataFrame([input_data], columns=X.columns)

y_pred = svc.predict(X_test)
print('Predicted target:', y_pred[0])

# with open('model_pickle','wb') as f:
#     pickle.dump(svc, f)

accuracy = accuracy_score(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)
print('Accuracy:', accuracy)
print('Confusion Matrix:\n', conf_matrix)

# Calculate the training time
training_time = end_time - start_time

print(f"Training time: {training_time:.2f} seconds")


# input_data = (46,1,0,120,249,0)
