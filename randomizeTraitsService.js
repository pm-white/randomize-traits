import express from "express";

const app = express();
const port = 10000;

app.use(express.json());

app.post("/randomize-traits", (req, res) => {
  const traits = req.body.traits;
  res.json(traits);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
