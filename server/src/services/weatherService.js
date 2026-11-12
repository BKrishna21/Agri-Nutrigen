
import axios from "axios";

const WEATHER_API_URL =
  "https://api.apilayer.net/weatherstack/current";

const stateCapitals = [
  { state: "Andhra Pradesh", capital: "Amaravati" },
  { state: "Arunachal Pradesh", capital: "Itanagar" },
  { state: "Assam", capital: "Dispur" },
  { state: "Bihar", capital: "Patna" },
  { state: "Chhattisgarh", capital: "Raipur" },
  { state: "Goa", capital: "Panaji" },
  { state: "Gujarat", capital: "Gandhinagar" },
  { state: "Haryana", capital: "Chandigarh" },
  { state: "Himachal Pradesh", capital: "Shimla" },
  { state: "Jharkhand", capital: "Ranchi" },
  { state: "Karnataka", capital: "Bengaluru" },
  { state: "Kerala", capital: "Thiruvananthapuram" },
  { state: "Madhya Pradesh", capital: "Bhopal" },
  { state: "Maharashtra", capital: "Mumbai" },
  { state: "Manipur", capital: "Imphal" },
  { state: "Meghalaya", capital: "Shillong" },
  { state: "Mizoram", capital: "Aizawl" },
  { state: "Nagaland", capital: "Kohima" },
  { state: "Odisha", capital: "Bhubaneswar" },
  { state: "Punjab", capital: "Chandigarh" },
  { state: "Rajasthan", capital: "Jaipur" },
  { state: "Sikkim", capital: "Gangtok" },
  { state: "Tamil Nadu", capital: "Chennai" },
  { state: "Telangana", capital: "Hyderabad" },
  { state: "Tripura", capital: "Agartala" },
  { state: "Uttar Pradesh", capital: "Lucknow" },
  { state: "Uttarakhand", capital: "Dehradun" },
  { state: "West Bengal", capital: "Kolkata" },
];

// Simple in-memory cache: 15 minutes
let weatherCache = null;
let cacheExpiry = null;

export const getAllStateWeather = async () => {
  if (weatherCache && cacheExpiry > Date.now()) {
    return weatherCache;
  }

  const results = await Promise.all(
    stateCapitals.map(async ({ state, capital }) => {
      try {
        const response = await axios.get(WEATHER_API_URL, {
          params: {
            access_key: process.env.WEATHERSTACK_ACCESS_KEY,
            query: capital,
            units: "m",
          },
          timeout: 15000,
        });

        const data = response.data;

        if (data.error) {
          throw new Error(data.error.info);
        }

        return {
          state,
          capital,
          success: true,
          location: data.location,
          current: data.current,
        };
      } catch (error) {
        console.error(
          `Weather fetch failed for ${capital}:`,
          error.message
        );

        return {
          state,
          capital,
          success: false,
          error: error.message,
        };
      }
    })
  );

  weatherCache = results;
  cacheExpiry = Date.now() + 15 * 60 * 1000;

  return results;
};
