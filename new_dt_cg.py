import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt
from sklearn.ensemble import VotingClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier

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

# Identify missing data
print(data.isnull().sum())

# # Data cleaning
# data = data.dropna()

# Identify and remove duplicate data
duplicates = data.duplicated()
print('Number of duplicate rows:', duplicates.sum())
data = data.drop_duplicates()

# Impute missing data with mean values
imputer = SimpleImputer(strategy='mean')
X = imputer.fit_transform(data.drop('target', axis=1))
y = data['target']

# Identify potential outliers using boxplots
fig, axs = plt.subplots(2, 5, figsize=(15, 6))
axs = axs.ravel()
for i in range(len(data.columns)):
    axs[i].boxplot(data[data.columns[i]])
    axs[i].set_title(data.columns[i])
plt.tight_layout()
plt.show()

# Define the threshold
Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1
threshold = 1.5 * IQR

# Identify and handle outliers
outliers = (data < (Q1 - threshold)) | (data > (Q3 + threshold))
data[outliers] = np.nan
imputer1 = SimpleImputer(strategy='median')
X = imputer1.fit_transform(X)

# Feature scaling
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the model with regularization hyperparameters
dt = DecisionTreeClassifier(max_depth=3, min_samples_split=10, min_samples_leaf=5, max_leaf_nodes=8, random_state=42)
rf = RandomForestClassifier(n_estimators=100, max_depth=3, random_state=42)
gb = GradientBoostingClassifier(n_estimators=100, max_depth=3, random_state=42)

ensemble = VotingClassifier(estimators=[('dt', dt), ('rf', rf), ('gb', gb)], voting='hard')

# Calculate the training accuracy
train_accuracy = dt.score(X_train, y_train)

# Train the model
ensemble.fit(X_train, y_train)

y_pred = ensemble.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print('Test accuracy:', accuracy)

# Calculate the noise
noise = train_accuracy - accuracy
print('Training accuracy:', train_accuracy)
print('Noise:', noise)
