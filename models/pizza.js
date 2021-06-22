const mongoose = require('mongoose');
const PizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
});
module.exports = mongoose.model('Pizza', PizzaSchema);
