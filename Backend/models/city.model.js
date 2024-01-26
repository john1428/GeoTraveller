import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  cityName: String,
  country: String,
  emoji: String,
  date: String,
  notes: String,
  position: {
    lat: String,
    lng: String,
  },
});

const City = mongoose.model("City", citySchema);

export default City;
