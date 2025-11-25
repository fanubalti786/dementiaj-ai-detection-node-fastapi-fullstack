import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) =>
    console.log(`some error occured while connection To Database: ${err}`),
  );

