const { Pizza } = require("../models");

const pizzaController = {
  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        // To populate a field, just chain the .populate() method onto your query, passing in an object with the key path plus the value of the field you want populated.
        path: "comments",
        select: "-__v", //  The minus sign - in front of the field indicates that we don't want it to be returned.
      })
      .select("-__v")
      .sort({ _id: -1 }) // to sort in DESC order by the _id value. This gets the newest pizza because a timestamp value is hidden somewhere inside the MongoDB ObjectId.
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        // To populate a field, just chain the .populate() method onto your query, passing in an object with the key path plus the value of the field you want populated.
        path: "comments",
        select: "-__v", //  The minus sign - in front of the field indicates that we don't want it to be returned.
      })
      .select("-__v")
      .then((dbPizzaData) => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createPizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },

  // update pizza by id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    }) // finds a single document we want to update, then updates it and returns the updated document. { new: true } is needed to return the updated version
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
module.exports = pizzaController;
