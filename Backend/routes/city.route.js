import express from "express";
import City from "../models/city.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await City.find({});
  return res.json(data);
});

router.post("/add", async function (req, res) {
  const body = req.body;
  console.log("sidd req", body);

  const user = await City.create({
    cityName: body.cityName,
    country: body.country,
    emoji: body.emoji,
    date: body.date,
    notes: body.notes,
    position: {
      lat: body.position.lat,
      lng: body.position.lng,
    },
  });

  console.log("user created");

  res.status(201).json(user);
});

router
  .route("/:id")
  .get(async (req, res) => {
    const foundCity = await City.findById(req.params.id);

    return res.send(foundCity);
  })
  .delete(async (req, res) => {
    const id = req.params["id"];
    await City.deleteOne({ _id: id });
    return res.send("Successfully deleted");
  });

export default router;
