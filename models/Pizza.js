const { Schema, model } = require("mongoose");

const PizzaSchema = new Schema({
  pizzaName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // defaults to current date
  },
  size: {
    type: String,
    default: "Large",
  },
  toppings: [], // [] indicates an array type
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
