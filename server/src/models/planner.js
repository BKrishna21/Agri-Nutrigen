import mongoose from "mongoose";



const parameters = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },



  email: {
    type: String,
    required: true
  },



  state: {
    type: String,
    required: true
  },



  district: {
    type: String,
    required: true
  },



  country: {
    type: String,
    required: true
  },



  latitude: {
    type: Number,
    required: true
  },



  longitude: {
    type: Number,
    required: true
  },



  environmentInfo: {

    N: Number,

    P: Number,

    K: Number,

    temperature: Number,

    humidity: Number,

    ph: Number,

    rainfall: Number,

    soil_type: String
  },



  recommendedCrop: {
    type: String,
    required: true
  }

}, { timestamps: true });




const soilParams = mongoose.model(
  "Parameters",
  parameters
);




export default soilParams;