
## 🌱 AgriNutrigen

> **Genomic-Driven Crop and Community Nutrition Planner**

AgriNutrigen is an AI-powered decision support platform that bridges agriculture, geospatial intelligence, nutrition, and machine learning to recommend suitable crops based on environmental and regional conditions.

The long-term vision is to assist governments, NGOs, agricultural planners, and researchers in improving food security and reducing nutritional deficiencies by integrating genomic information, health analytics, soil conditions, and climate data.

The current MVP focuses on intelligent crop recommendation using Machine Learning, GIS-based location selection, environmental datasets, and a full-stack MERN architecture.


# 📌 Overview

Agriculture plays a critical role in ensuring food security, but traditional crop planning often ignores local environmental conditions and nutritional needs.

AgriNutrigen provides an intelligent recommendation system capable of suggesting the most suitable crop for a selected location using:

- Geographic location
- Soil environmental parameters
- Weather-related information
- Machine Learning prediction based on decision tree algorithm

The project combines GIS, Artificial Intelligence, and Full Stack Web Development into a single decision-support platform.

---

# ❗ Problem Statement

Traditional agricultural planning generally relies on historical practices and manual expertise.

This often leads to:

- Poor crop selection
- Reduced agricultural productivity
- Soil degradation
- Inefficient utilization of environmental resources
- Nutritional imbalance in communities

The long-term vision of AgriNutrigen is to use genomics, nutrition analytics, GIS, and AI to improve agricultural planning and community nutrition.

---

# 🎯 Objectives

Current MVP

- Recommend crops using Machine Learning.
- Detect user location through interactive maps.
- Retrieve district and state information automatically.
- Match environmental data with selected locations.
- Allow users to save crop recommendations.
- Build a scalable MERN architecture.

Future Vision

- Integrate SNP (genomic) data.
- Analyze regional nutritional deficiencies.
- Predict future disease trends.
- Generate policy-ready reports.
- Assist governments in crop planning.

---

# ✨ Features

## Current Features

- User Authentication
- Interactive GIS Map
- Location Selection
- Reverse Geocoding
- Environmental Dataset Matching
- Machine Learning Crop Prediction
- Save Crop Plans
- View Saved Plans
- Delete Saved Plans
- Responsive UI

## Planned Features

- Genomic Data Integration
- Nutritional Analytics
- Disease Prediction
- Weather Forecast Integration
- Crop Yield Prediction
- Fertilizer Recommendation
- Dashboard Analytics
- Government Planning Reports
- Multi-language Support

---

# 🛠 Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Leaflet
- React Leaflet

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator
- Bcrypt

## Machine Learning

- Python
- Flask
- Scikit-Learn
- Random Forest Classifier
- Pandas
- NumPy
- Joblib

## External Services

- OpenStreetMap
- Nominatim Reverse Geocoding API

---

# 🏗 System Architecture

```
                    User
                      │
                      ▼
            React Frontend (Vite)
                      │
             Select Location
                      │
                      ▼
              Express Backend
          ┌───────────┼────────────┐
          │           │            │
          ▼           ▼            ▼
 Reverse Geocoding   MongoDB   Python ML Server
     (OSM API)                   (Flask)
          │                        │
          └───────────┬────────────┘
                      ▼
           Crop Recommendation
                      │
                      ▼
               Save Recommendation
```

---

# 🔄 Project Workflow

1. User registers or logs in.
2. User opens the Planner.
3. User selects a location on the interactive map.
4. Latitude and longitude are sent to the backend.
5. Backend performs reverse geocoding.
6. District and state are identified.
7. Environmental parameters are matched from the dataset.
8. Data is sent to the Machine Learning model.
9. The model predicts the most suitable crop.
10. The recommendation is displayed.
11. User can save the recommendation.
12. Saved plans are stored in MongoDB.

---

# 🤖 Machine Learning

The project uses a **Random Forest Classifier** trained on crop recommendation datasets.

### Input Features

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature
- Humidity
- pH
- Rainfall

### Output

- Recommended Crop

---

# 📂 Project Structure

```
AgriNutrigen
│
├── src/                     # React Frontend
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
├── ml/
│   ├── train_model.py
│   └── predict.py
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/BKrishna21/AgriNutrigen.git

cd AgriNutrigen
```

---

## Install Frontend

```bash
npm install
```

---

## Install Backend

```bash
cd server

npm install
```

---

## Install Python Dependencies

```bash
pip install flask
pip install pandas
pip install numpy
pip install scikit-learn
pip install joblib
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

# ▶ Running the Project

## Frontend

```bash
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## Backend

```bash
cd server

npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## Machine Learning Server

```bash
cd ml

python predict.py
```

Runs on:

```
http://localhost:5001
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Location

```
POST /api/location/reverse-geocode
```

## Machine Learning

```
POST /api/ml/predict-crop
```

## Saved Plans

```
POST   /api/savedplans/soildata
GET    /api/savedplans/allsoildata/:email
DELETE /api/savedplans/deleteplan/:id
```

---

# 💾 Database Schema

## User

```javascript
{
  displayName,
  email,
  password
}
```

## Saved Plans

```javascript
{
  name,
  email,

  state,
  district,
  country,

  latitude,
  longitude,

  environmentInfo:{
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall,
      soil_type
  },

  recommendedCrop,

  createdAt
}
```

---

# 🚀 Future Scope

The MVP demonstrates intelligent crop recommendation using environmental parameters.

Future versions aim to include:

- SNP (Genomic) Data Integration
- Nutritional Deficiency Prediction
- Population Health Analytics
- Disease Trend Forecasting
- Climate Change Analysis
- Crop Yield Prediction
- Fertilizer Recommendation
- Government Planning Dashboard
- GIS Heatmaps
- AI-based Report Generation
- Mobile Application
- Cloud Deployment
- Blockchain-based Food Traceability

---
