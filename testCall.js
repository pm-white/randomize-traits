import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  const response = await fetch("http://localhost:10000/randomize-traits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lockedTraits: ["origins"],
      classes: 10,
      subclasses: [3, 3, 4, 5, 2, 6, 3, 3, 4, 5],
      species: 9,
      origins: 12,
      alignments: 9,
    }),
  });

  const data = await response.json();

  res.json(data);
});

app.listen(port, () => {
  console.log(`Test call service listening on port ${port}`);
});
