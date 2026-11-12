
import { getAllStateWeather } from "../services/weatherService.js";

export const getRegionalWeather = async (req, res) => {
  try {
    const weather = await getAllStateWeather();

    res.status(200).json({
      success: true,
      count: weather.length,
      data: weather,
    });
  } catch (error) {
    console.error("Regional weather error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch regional weather data",
    });
  }
};
