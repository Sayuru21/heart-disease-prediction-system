# Importing Pandas library for data manipulation and analysis
import pandas as pd

# Importing Numpy library for numerical operations
import numpy as np

# Importing StandardScaler class from scikit-learn library for data scaling
from sklearn.preprocessing import StandardScaler

# Importing DecisionTreeClassifier class from scikit-learn library for classification using decision trees
from sklearn.tree import DecisionTreeClassifier

# Importing train_test_split function from scikit-learn library for splitting data into training and testing sets
from sklearn.model_selection import train_test_split

# Importing SimpleImputer class from scikit-learn library for handling missing data
from sklearn.impute import SimpleImputer

# Importing VotingClassifier class from scikit-learn library for ensembling multiple models
from sklearn.ensemble import VotingClassifier

# Importing RandomForestClassifier class from scikit-learn library for classification using random forests
from sklearn.ensemble import RandomForestClassifier

# Importing GradientBoostingClassifier class from scikit-learn library for classification using gradient boosting
from sklearn.ensemble import GradientBoostingClassifier

# Importing accuracy_score, precision_score, confusion_matrix, recall_score, f1_score, roc_curve and roc_auc_score functions
# from scikit-learn library for evaluating model performance
from sklearn.metrics import accuracy_score, precision_score, confusion_matrix, recall_score, f1_score, roc_curve, roc_auc_score, auc

# Importing matplotlib.pyplot module from matplotlib library for data visualization
import matplotlib.pyplot as plt


# Reading data from CSV file using Pandas read_csv() function
data = pd.read_csv('heart_data.csv')

# Converting certain columns to numeric data type and handling errors using Pandas to_numeric() function
data['age'] = pd.to_numeric(data['age'], errors='coerce')
data['sex'] = pd.to_numeric(data['sex'], errors='coerce')
data['cp'] = pd.to_numeric(data['cp'], errors='coerce')
data['trestbps'] = pd.to_numeric(data['trestbps'], errors='coerce')
data['chol'] = pd.to_numeric(data['chol'], errors='coerce')
data['fbs'] = pd.to_numeric(data['fbs'], errors='coerce')

# Printing the statistical summary of the dataset using Pandas describe() function
print(data.describe())

# Handling columns with values outside of expected range by replacing them with NaN values
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

# Identifying missing data in the dataset using Pandas isnull() function and summing the missing values
print(data.isnull().sum())

# Identifying and removing duplicate data in the dataset using Pandas duplicated() and drop_duplicates() functions
duplicates = data.duplicated()
print('Number of duplicate rows:', duplicates.sum())
data = data.drop_duplicates()

# Impute missing data with mean values
imputer = SimpleImputer(strategy='mean')
X = imputer.fit_transform(data.drop('target', axis=1)) # drop target variable, impute missing values with mean, and save as X
y = data['target'] # save target variable as y

# Identify potential outliers using boxplots
fig, axs = plt.subplots(2, 5, figsize=(15, 6)) # create subplots
axs = axs.ravel() # flatten subplots array
for i in range(len(data.columns)): # loop through each column of data
    axs[i].boxplot(data[data.columns[i]]) # create boxplot of column data
    axs[i].set_title(data.columns[i]) # add column name as subplot title
plt.tight_layout() # adjust subplot spacing
plt.show() # display subplots

# Define the threshold for identifying outliers
Q1 = data.quantile(0.25) # calculate first quartile of each column
Q3 = data.quantile(0.75) # calculate third quartile of each column
IQR = Q3 - Q1 # calculate interquartile range of each column
threshold = 1.5 * IQR # define threshold as 1.5 times the interquartile range

# Identify and handle outliers by replacing with NaN values
outliers = (data < (Q1 - threshold)) | (data > (Q3 + threshold)) # identify values outside the threshold
data[outliers] = np.nan # replace these values with NaN
imputer1 = SimpleImputer(strategy='median') # impute missing values with median
X = imputer1.fit_transform(X) # impute missing values with median and save as X

# Feature scaling
scaler = StandardScaler() # create instance of StandardScaler
X = scaler.fit_transform(X) # scale features and save as X

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the model with regularization hyperparameters
dt = DecisionTreeClassifier(max_depth=3, min_samples_split=10, min_samples_leaf=5, max_leaf_nodes=8, random_state=42)
rf = RandomForestClassifier(n_estimators=100, max_depth=3, random_state=42)
gb = GradientBoostingClassifier(n_estimators=100, max_depth=3, random_state=42)

# Create the ensemble model using soft voting
ensemble = VotingClassifier(estimators=[('dt', dt), ('rf', rf), ('gb', gb)], voting='soft')

# Train the model using the training set
ensemble.fit(X_train, y_train)

# Use the trained model to make predictions on the training and testing sets
y_pred_train = ensemble.predict(X_train)
y_pred_test = ensemble.predict(X_test)

# Calculate the accuracy of the model on the training and testing sets
train_accuracy = accuracy_score(y_train, y_pred_train)
test_accuracy = accuracy_score(y_test, y_pred_test)

# Print the accuracy of the model on the testing set
accuracy = accuracy_score(y_test, y_pred_test)
print("Accuracy on testing set: ", accuracy)

# Calculate and print the confusion matrix for the training set
train_confusion_matrix = confusion_matrix(y_train, y_pred_train)
print("Training Confusion Matrix:")
print(train_confusion_matrix)

# Calculate and print the confusion matrix for the testing set
test_confusion_matrix = confusion_matrix(y_test, y_pred_test)
print("Testing Confusion Matrix:")
print(test_confusion_matrix)


print('Training accuracy:', train_accuracy)
print('Test accuracy:', accuracy)

# Compute precision, recall, and F1 score
precision = precision_score(y_test, y_pred_test)
recall = recall_score(y_test, y_pred_test)
f1 = f1_score(y_test, y_pred_test)
print('Precision:', precision)
print('Recall:', recall)
print('F1 score:', f1)

# Compute ROC curve and AUC
y_pred_train = ensemble.predict_proba(X_train)[:,1]
roc_auc_train = roc_auc_score(y_train, y_pred_train)

y_pred_test = ensemble.predict_proba(X_test)[:,1]
roc_auc_test = roc_auc_score(y_test, y_pred_test)

fpr, tpr, thresholds = roc_curve(y_test, y_pred_test)
roc_auc = auc(fpr, tpr)

# Plot ROC curve
plt.figure()
lw = 2
plt.plot(fpr, tpr, color='darkorange', lw=lw, label='ROC curve (area = %0.2f)' % roc_auc)
plt.plot([0, 1], [0, 1], color='navy', lw=lw, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver operating characteristic example')
plt.legend(loc="lower right")
plt.show()

# Print ROC AUC scores
print('ROC AUC Train:', roc_auc_train)
print('ROC AUC Test:', roc_auc_test)