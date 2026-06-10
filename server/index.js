import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import app from "./src/app.js";

import connectDB from "./src/config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:3000"
}));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});