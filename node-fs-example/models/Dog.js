const fs = require("fs");
const path = require("path");

// create path to our data file
const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "dogs.json"
);

// read our dog json file then apply a callback
getDogsFromFile = cb => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}

module.exports = Dog;
