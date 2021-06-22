//require('dotenv').config({ path: './variables.env' });
process.env.DB =
  'mongodb+srv://pizzeria:$U3CRy.XEP5dYd3@cluster0.2cn3b.mongodb.net/test?retryWrites=true&w=majority';
const connectToDatabase = require('../db');

const mongoose = require('mongoose');
const Pizza = require('../models/pizza');
const values = require('./description');

const queryAllPizzas = async () => {
  await connectToDatabase();

  //Where User is you mongoose user model
  Pizza.updateMany(
    {},
    {
      $set: {
        image: 'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734',
        message: values[Math.floor(Math.random() * values.length)],
      },
    },
    { upsert: true }
  );
};

queryAllPizzas();
