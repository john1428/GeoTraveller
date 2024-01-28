import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cityRouter from "./routes/city.route.js";
import bodyParser from "body-parser";
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("successfull connection"))
  .catch((err) => console.log(err));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api/cities", cityRouter);

app.get("/", function (req, res) {
  res.send("sidharth here");
});

app.listen(process.env.PORT, () => {
  console.log("listening at port 4000");
});
