const Dog = require("../models/Dog");

// handle post requests to /dogs
exports.postDogs = (req, res, next) => {
  const dog = new Dog(req.body.name, req.body.breed);
  dog.save();
  res.redirect("/");
};

exports.getDogs = (req, res, next) => {
  Dog.getAllDogs(dogs => {
    res.render("dogs", {
      hasDogs: dogs.length > 0,
      dogs
    });
  });
};
