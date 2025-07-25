import express from "express";
import { omit, keys, random } from "lodash-es";

const app = express();
const port = 10000;

app.use(express.json());

app.post("/randomize-traits", (req, res) => {
  const data = req.body.traits;

  // destructure locked traits arr and traits
  const { lockedTraits, ...traits } = data;

  // remove locked traits
  const usableTraits = omit(traits, lockedTraits);

  // initialize return traits object
  // NOTE: doesn't handle sublcasses
  let randomTraits = new Object();
  for (const key of keys(usableTraits)) {
    randomTraits[key] = random(0, usableTraits[key] - 1);
  }

  console.log("usableTraits:", usableTraits);
  console.log("randomTraits:", randomTraits);

  res.json(traits);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
