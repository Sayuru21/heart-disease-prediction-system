import pandas as pd
import numpy as np
from scipy.stats._mstats_basic import winsorize
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.neighbors import KNeighborsClassifier
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split

from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix
import matplotlib.pyplot as plt
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GridSearchCV

data = pd.read_csv('heart_data_303_column_6.csv')

data['age'] = pd.to_numeric(data['age'], errors='coerce')
data['sex'] = pd.to_numeric(data['sex'], errors='coerce')
data['cp'] = pd.to_numeric(data['cp'], errors='coerce')
data['trestbps'] = pd.to_numeric(data['trestbps'], errors='coerce')
data['chol'] = pd.to_numeric(data['chol'], errors='coerce')
data['fbs'] = pd.to_numeric(data['fbs'], errors='coerce')

# Check column ranges
print(data.describe())

# Handle columns with values outside of expected range
data.loc[data['age'] < 0, 'age'] = np.nan
data.loc[data['age'] > 120, 'age'] = np.nan
data.loc[data['sex'] < 0, 'sex'] = np.nan
data.loc[data['sex'] > 1, 'sex'] = np.nan
data.loc[data['cp'] < 0, 'cp'] = np.nan
data.loc[data['cp'] > 3, 'cp'] = np.nan
data.loc[data['trestbps'] < 0, 'trestbps'] = np.nan
data.loc[data['trestbps'] > 300, 'trestbps'] = np.nan
data.loc[data['chol'] < 0, 'chol'] = np.nan
data.loc[data['chol'] > 600, 'chol'] = np.nan
data.loc[data['fbs'] < 0, 'fbs'] = np.nan
data.loc[data['fbs'] > 1, 'fbs'] = np.nan

# Identify missing values
print('Missing values:\n', data.isnull().sum())

# Identify outliers using box plots
plt.figure(figsize=(10,6))
data.boxplot()
plt.show()

# Handle outliers using winsorization
data['age'] = winsorize(data['age'], (0.01, 0.01))
data['trestbps'] = winsorize(data['trestbps'], (0.01, 0.01))
data['chol'] = winsorize(data['chol'], (0.01, 0.01))

duplicates = data.duplicated()
print('Number of duplicate rows:', duplicates.sum())
data = data.drop_duplicates()

# Impute missing values using SimpleImputer
imputer = SimpleImputer(strategy='mean')
X = imputer.fit_transform(data.drop('target', axis=1))
y = data['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a pipeline with StandardScaler and SVC
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('svc', SVC(kernel='linear'))
])

# Define parameter grid
param_grid = {
    'svc__C': [0.1, 1, 10],
    'svc__gamma': [0.1, 1, 10],
    'svc__kernel': ['linear', 'rbf']
}

# Create GridSearchCV object
grid = GridSearchCV(pipe, param_grid=param_grid, cv=5)

# Fit GridSearchCV object to training data
grid.fit(X_train, y_train)

# Get best hyperparameters and test accuracy
best_params = grid.best_params_
best_score = grid.best_score_
test_accuracy = grid.score(X_test, y_test)

# Print results
print("Best parameters:", best_params)
print("Best training score:", best_score)
print("Test accuracy:", test_accuracy)

# knn = KNeighborsClassifier(n_neighbors=5)
# rf = RandomForestClassifier(n_estimators=100)