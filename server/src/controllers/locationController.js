import axios from "axios";



export const getLocationDetails = async (req, res) => {

  try {

    const { lat, lng } = req.body;

    // VALIDATION

    if (!lat || !lng) {

      return res.status(400).json({

        message: "Latitude and Longitude required"
      });
    }




    // NOMINATIM API CALL

    const response = await axios.get(

      `https://nominatim.openstreetmap.org/reverse`,

      {

        params: {

          lat: lat,

          lon: lng,

          format: "json"
        },

        headers: {

          "User-Agent": "AgriNutrigen-App"
        }
      }
    );




    const address = response.data.address;




    // EXTRACT DATA

    const locationData = {

      district:
        address.city ||
        address.town ||
        address.village ||
        "Unknown",

      state:
        address.state || "Unknown",

      country:
        address.country || "Unknown"
    };




    return res.status(200).json({

      status: "Location fetched successfully",

      data: locationData
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      message: "Server Error"
    });
  }
};