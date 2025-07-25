import express from "express";

const app = express();
const port = 3000;

const api_url = "http://localhost:10000/randomize-traits";

const testRequestBody = {
  lockedTraits: ["origins", "subclasses"],
  classes: 10,
  subclasses: [3, 3, 4, 5, 2, 6, 3, 3, 4, 5],
  species: 9,
  origins: 12,
  alignments: 9,
};

app.get("/", async (req, res) => {
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ traits: testRequestBody }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Sender app listening on port ${port}`);
});
