import express from "express";
import { omit, keys, random } from "lodash-es";

const app = express();
const port = 10000;

app.use(express.json());

app.post("/randomize-traits", (req, res) => {
  const data = req.body;

  const { lockedTraits, classes, subclasses, species, origins, alignments } =
    data;

  const selectedClass = random(0, classes - 1);
  const selectedSubclass = random(0, subclasses[selectedClass] - 1);
  const selectedSpecies = random(0, species - 1);
  const selectedOrigin = random(0, origins - 1);
  const selectedAlignment = random(0, alignments - 1);

  const randomTraits = {
    classes: selectedClass,
    subclasses: selectedSubclass,
    species: selectedSpecies,
    origins: selectedOrigin,
    alignments: selectedAlignment,
  };

  // remove locked traits
  const usableTraits = omit(randomTraits, lockedTraits);

  // fix cases
  const returnTraits = {};
  const useableTraitsKeys = keys(usableTraits);
  for (const key of useableTraitsKeys) {
    if (key === "classes") {
      returnTraits["class"] = usableTraits[key];
    }
    if (key === "subclasses") {
      returnTraits["subclass"] = usableTraits[key];
    }
    if (key === "species") {
      returnTraits["species"] = usableTraits[key];
    }
    if (key === "origins") {
      returnTraits["origin"] = usableTraits[key];
    }
    if (key === "alignments") {
      returnTraits["alignment"] = usableTraits[key];
    }
  }

  res.json(returnTraits);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
