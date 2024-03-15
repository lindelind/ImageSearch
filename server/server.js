const express = require("express");
const fs = require("fs").promises;
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware för att hantera CORS och JSON-data
app.use(cors());
app.use(express.json())


// Route för att hämta favoritbilder för en specifik användare.
// Läser favoritinformation från en JSON-fil och returnerar det för den begärda användaren.
// Om användaren inte finns i filen, returneras "user not found".
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

//för att lägga till bilder i en användares favoriter.
 //Läser favoritinformation från en JSON-fil, lägger till den nya bilden för den angivna användaren,
// och skriver sedan den uppdaterade informationen tillbaka till filen.
// Om filen inte finns skapas en ny.
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
    console.error("Error adding favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
