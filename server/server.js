const express = require("express");
const fs = require("fs").promises;
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json())

app.get("/api/favorites/:userName", async (req, res) => {
  try {
    const fileName = "favorites.json";
    const data = await fs.readFile(fileName, "utf-8");
    const favorites = JSON.parse(data);

    
    if (favorites[req.params.userName]) {
      res.status(200).json(favorites[req.params.userName].favoriteImages);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error reading favorites file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addtofavorites", async (req, res) => {
  try {
    const fileName = "favorites.json";
    let favorites;
    try {
      const data = await fs.readFile(fileName, "utf-8");
      favorites = JSON.parse(data);
    } catch (error) {
      favorites = {};
    }

    
    if (!favorites[req.body.userName]) {
      favorites[req.body.userName] = { favoriteImages: [] };
    }
    favorites[req.body.userName].favoriteImages.push({
      title: req.body.imageResult.title,
      byteSize: req.body.imageResult.image.byteSize,
      url: req.body.imageResult.link,
    });

    await fs.writeFile(fileName, JSON.stringify(favorites, null, 2));

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
