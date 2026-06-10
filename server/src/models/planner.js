import mongoose from "mongoose";

const parameters =new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    region:{
        type:String,
        required: true,
    },
    soiltype:{
        type:String,
        required: true,
    },
    commondeficiency:{
        type:String,
        required:true,
    },
    recommendation : {
        crops: [String],
        focus: String,
        tips: String
    }
}, { timestamps: true });

const soilParams = mongoose.model("Parameters",parameters);

export default soilParams;
