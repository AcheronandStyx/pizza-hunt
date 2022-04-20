const router = require("express").Router();
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza, // Instead of importing the entire object and having to do pizzaController.getAllPizza(),
  deletePizza, // we can simply destructure the method names out of the imported object and use those names directly. 
} = require("../../controllers/pizza-controller");
// Instead of creating duplicate routes for the individual HTTP methods, we can combine them!

// Set up GET all and POST at /api/pizzas
router.route("/").get(getAllPizza).post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router.route("/:id").get(getPizzaById).put(updatePizza).delete(deletePizza);

module.exports = router;
