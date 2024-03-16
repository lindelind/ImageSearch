const express = require("express");
const fs = require("fs").promises;
require("dotenv").config();
const cors = require("cors");
const favoriteSchema = require("./favorites.schema");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/favorites/:user", async (req, res) => {
  try {
    const fileName = "favorites.json";

    let favorites = {};
    try {
      const favoriteData = await fs.readFile(fileName, "utf-8");
      favorites = JSON.parse(favoriteData);
    } catch (error) {
      console.error("Error reading favorites file", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const userFavorites = favorites[req.params.user];
    if (userFavorites) {
      res.status(200).json(userFavorites.favoriteImages);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addtofavorites", async (req, res) => {
  const title  = req.body.imageResult.title;
  const url = req.body.imageResult.link;
  const byteSize = req.body.imageResult.image.byteSize;
  const validateFavorite = favoriteSchema.validate({ title, byteSize, url });
  console.log(validateFavorite);

  try {
    const fileName = "favorites.json";

    let favorites = {};
    try {
      const favoriteData = await fs.readFile(fileName, "utf-8");
      favorites = JSON.parse(favoriteData);
    } catch (error) {
      console.error("Error reading favorites:", error);
    }

    const user = req.body.user;
    if (!favorites[user]) {
      favorites[user] = { favoriteImages: [] };
    }
    favorites[user].favoriteImages.push({ title, byteSize, url });

    await fs.writeFile(fileName, JSON.stringify(favorites, null, 2));

    res.status(201).json(favorites);
  } catch (error) {
    console.error("Error adding favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
