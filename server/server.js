

const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hejhej detta är rooten");
});

app.listen(port, () => {
  console.log(`Server up and running på port ${port}.`);
});