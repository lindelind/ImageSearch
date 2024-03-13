//test
const fs = require("fs").promises;

const favorites = [
  {
    user: "lindelind",
    favoriteImages: [
      {
        title: "Dog",
        byteSize: 2832098,
        url: "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_3x2.jpg",
      },
    ],
  },
];

const saveFavorite = async () => {
    await fs.writeFile(".favorites.json", JSON.stringify(favorites, null, 2));
}

saveFavorite();