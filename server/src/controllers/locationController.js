// import axios from "axios";



// export const getLocationDetails = async (req, res) => {

//   try {

//     const { lat, lng } = req.body;

//     // VALIDATION

//     if (!lat || !lng) {

//       return res.status(400).json({

//         message: "Latitude and Longitude required"
//       });
//     }




//     // NOMINATIM API CALL

//     const response = await axios.get(

//       `https://nominatim.openstreetmap.org/reverse`,

//       {

//         params: {

//           lat: lat,

//           lon: lng,

//           format: "json"
//         },

//         headers: {

//           "User-Agent": "AgriNutrigen-App"
//         }
//       }
//     );




//     const address = response.data.address;




//     // EXTRACT DATA

//     const locationData = {

//       district:
//         address.city ||
//         address.town ||
//         address.village ||
//         "Unknown",

//       state:
//         address.state || "Unknown",

//       country:
//         address.country || "Unknown"
//     };




//     return res.status(200).json({

//       status: "Location fetched successfully",

//       data: locationData
//     });

//   } catch (error) {

//     console.log(error);

//     return res.status(500).json({

//       message: "Server Error"
//     });
//   }
// };



import axios from "axios";

export const getLocationDetails = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    // STEP 1: Validate coordinates
    if (
      lat === undefined ||
      lng === undefined ||
      !Number.isFinite(Number(lat)) ||
      !Number.isFinite(Number(lng))
    ) {
      return res.status(400).json({
        message: "Valid latitude and longitude are required."
      });
    }

    const latitude = Number(lat);
    const longitude = Number(lng);

    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        message: "Latitude or longitude is out of range."
      });
    }

    // STEP 2: Call Nominatim reverse-geocoding API
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
          addressdetails: 1
        },
        headers: {
          "User-Agent": "AgriNutrigen-App"
        },
        timeout: 10000
      }
    );

    // STEP 3: Safely extract address
    const address = response.data?.address;

    if (!address) {
      console.log(
        "Nominatim returned no address:",
        response.data
      );

      return res.status(404).json({
        message: "No address found for the selected coordinates."
      });
    }

    // STEP 4: Extract location details
    const district =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      address.state_district ||
      "Unknown";

    const locationData = {
      district,
      state: address.state || "Unknown",
      country: address.country || "Unknown"
    };

    // STEP 5: Send response
    return res.status(200).json({
      status: "Location fetched successfully",
      data: locationData
    });

  } catch (error) {
    console.error(
      "Reverse Geocoding Error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return res.status(502).json({
        message: "Location service returned an error."
      });
    }

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        message: "Location service timed out. Please try again."
      });
    }

    return res.status(500).json({
      message: "Unable to fetch location details."
    });
  }
};