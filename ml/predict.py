
from flask import Flask, request, jsonify

import joblib

import numpy as np




app = Flask(__name__)




# LOAD MODEL

model = joblib.load(
    "crop_model.pkl"
)




@app.route("/predict", methods=["POST"])

def predict():

    try:

        data = request.json




        features = np.array([[
            data["N"],
            data["P"],
            data["K"],
            data["temperature"],
            data["humidity"],
            data["ph"],
            data["rainfall"]
        ]])




        prediction = model.predict(features)




        return jsonify({

            "recommended_crop":
                prediction[0]
        })



    except Exception as e:

        return jsonify({

            "error": str(e)
        })




if __name__ == "__main__":

    app.run(
        port=5001,
        debug=True
    )