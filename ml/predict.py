

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


        # INPUT FEATURES
        features = np.array([[
            data["N"],
            data["P"],
            data["K"],
            data["temperature"],
            data["humidity"],
            data["ph"],
            data["rainfall"]
        ]])


        # GET PROBABILITIES
        probabilities = model.predict_proba(
            features
        )[0]


        # GET CROP NAMES
        crop_names = model.classes_


        # COMBINE CROP + PROBABILITY
        crop_predictions = []

        for crop, probability in zip(
            crop_names,
            probabilities
        ):

            crop_predictions.append({
                "crop": crop,
                "probability": round(
                    float(probability),
                    4
                )
            })


        # SORT FROM HIGHEST TO LOWEST
        crop_predictions.sort(
            key=lambda x: x["probability"],
            reverse=True
        )


        # TOP 5 CROPS
        top_crops = crop_predictions[:5]


        return jsonify({

            "top_crops": top_crops

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