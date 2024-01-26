import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cityRouter from "./routes/city.route.js";
const app = express();
// const router = express.Router();

app.use("/api/cities", cityRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("successfull connection"))
  .catch((err) => console.log(err));

const cities = [
  {
    id: "f12a",
    cityName: "Tsabit",
    country: "Algeria",
    emoji: "🇩🇿",
    date: "2024-01-23T21:44:58.416Z",
    notes: "",
    position: {
      lat: "28.20760859532738",
      lng: "-1.8237304687500002",
    },
  },
  {
    id: "c54e",
    cityName: "Tindouf",
    country: "Algeria",
    emoji: "🇩🇿",
    date: "2024-01-23T21:45:03.530Z",
    notes: "",
    position: {
      lat: "27.741884632507087",
      lng: "-6.5478515625",
    },
  },
  {
    id: "22b6",
    cityName: "Borovoy",
    country: "Russian Federation (the)",
    emoji: "🇷🇺",
    date: "2024-01-23T21:45:15.519Z",
    notes: "xc",
    position: {
      lat: "64.60503753178527",
      lng: "32.12402343750001",
    },
  },
  {
    id: "b5a6",
    cityName: "Lezuza",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2024-01-24T09:14:21.130Z",
    notes: "",
    position: {
      lat: "38.94232097947902",
      lng: "-2.1533203125000004",
    },
  },
  {
    id: "a76f",
    cityName: "Nikli",
    country: "Bangladesh",
    emoji: "🇧🇩",
    date: "2024-01-24T10:33:54.047Z",
    notes: "",
    position: {
      lat: "24.367113562651276",
      lng: "90.98876953125001",
    },
  },
  {
    id: "5488",
    cityName: "Robertsganj",
    country: "India",
    emoji: "🇮🇳",
    date: "2024-01-24T12:21:11.983Z",
    notes: "",
    position: {
      lat: "24.5271348225978",
      lng: "83.14453125000001",
    },
  },
  {
    id: "8ef2",
    cityName: "Jhansi",
    country: "India",
    emoji: "🇮🇳",
    date: "2024-01-24T12:25:47.708Z",
    notes: "HOME ",
    position: {
      lat: "25.418470119273117",
      lng: "78.59619140625001",
    },
  },
  {
    id: "2657",
    cityName: "Campos",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2024-01-24T20:05:35.370Z",
    notes: "",
    position: {
      lat: "39.436192999314095",
      lng: "3.0761718750000004",
    },
  },
  {
    id: "8cae",
    cityName: "Lys’va",
    country: "Russian Federation (the)",
    emoji: "🇷🇺",
    date: "2024-01-24T20:05:42.174Z",
    notes: "",
    position: {
      lat: "57.98480801923985",
      lng: "57.88955021605108",
    },
  },
  {
    id: "6f0b",
    cityName: "Derinkuyu",
    country: "Turkiye",
    emoji: "🇹🇷",
    date: "2024-01-24T20:08:37.520Z",
    notes: "",
    position: {
      lat: "38.41055825094609",
      lng: "34.80468750000001",
    },
  },
  {
    id: "bae2",
    cityName: "Sura",
    country: "Russian Federation (the)",
    emoji: "🇷🇺",
    date: "2024-01-24T20:08:43.841Z",
    notes: "",
    position: {
      lat: "63.470144746565445",
      lng: "45.3515625",
    },
  },
];

// app.use(router);

app.get("/", function (req, res) {
  res.send("sidharth here");
});

app.get("/api/cities", (req, res) => {
  return res.send(cities);
});

app.get("/api/cities/:id", (req, res) => {
  const id = req.params["id"];
  console.log(req.params["id"]);
  const city = cities.filter((city) => city.id === id);
  return res.send(city);
});

app.listen(process.env.PORT, () => {
  console.log("listening at port 4000");
});

console.log("sidharth");
