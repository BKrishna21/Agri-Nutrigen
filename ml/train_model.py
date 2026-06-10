import pandas as pd

from sklearn.ensemble import RandomForestClassifier

from sklearn.model_selection import train_test_split

from sklearn.metrics import accuracy_score

import joblib




# LOAD DATASET

data = pd.read_csv(
    "Crop_recommendation.csv"
)




# INPUT FEATURES

X = data[[
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall"
]]




# TARGET LABEL

y = data["label"]




# SPLIT DATA

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.2,

    random_state=42
)




# TRAIN MODEL

model = RandomForestClassifier()

model.fit(X_train, y_train)




# TEST ACCURACY

predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)

print("Accuracy:", accuracy)




# SAVE MODEL

joblib.dump(
    model,
    "crop_model.pkl"
)

print("Model saved successfully")