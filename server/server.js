const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;


app.get("/api/favorites", async (req, res) => {
  try {
    
    const data = await fs.readFile(".favorites.json", "utf-8");
    // console.log(data); 
    const favorites = JSON.parse(data);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error reading favorites file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
