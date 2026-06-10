import axios from "axios";



export const predictCrop = async (req, res) => {

  try {

    const {

      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall

    } = req.body;




    // SEND DATA TO PYTHON ML API

    const mlResponse = await axios.post(

      "http://127.0.0.1:5001/predict",

      {

        N,
        P,
        K,
        temperature,
        humidity,
        ph,
        rainfall
      }
    );




    // GET PREDICTION

    const recommendedCrop =
      mlResponse.data.recommended_crop;




    // SEND RESPONSE TO FRONTEND

    return res.status(200).json({

      status: "Prediction successful",

      recommendedCrop
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      message: "Prediction failed"
    });
  }
};