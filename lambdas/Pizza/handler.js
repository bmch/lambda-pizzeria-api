'use strict';
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('../../db');
const Pizza = require('../../models/pizza');
const responses = require('../API_Responses');

module.exports.getAllPizzas = async (event) => {
  try {
    await connectToDatabase();
    const result = await Pizza.find();
    return responses._200({ data: result });
  } catch (err) {
    console.error(err);
    return responses._400({
      error: { message: err.message ? err.message : err },
    });
  }
};

module.exports.createPizza = async (event) => {
  try {
    await connectToDatabase();
    const result = await Pizza.create(JSON.parse(event.body));

    return responses._200({ data: result });
  } catch (err) {
    console.error(err);
    return responses._400({
      error: { message: err.message ? err.message : err },
    });
  }
};
