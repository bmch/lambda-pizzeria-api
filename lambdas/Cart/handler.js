'use strict';
require('dotenv').config({ path: '../../variables.env' });

const connectToDatabase = require('../../db');
const Pizza = require('../../models/pizza');
const { Cart, OrderItem, Order } = require('../../models/cart');

module.exports.createCart = async (event) => {
  try {
    console.info('Checking event');
    if (!event) throw new Error('Event not found');

    await connectToDatabase();
    const result = await Cart.create({});
    console.log('=> this is the cart created', result);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error(err.message ? err.message : err);
    return { status: 'Error', message: error.message ? error.message : error };
  }
};

module.exports.addToCart = async (event) => {
  try {
    console.info('Checking event');
    if (!event) throw new Error('Event not found');

    await connectToDatabase();

    const { pizza, quantity } = JSON.parse(event.body);
    const cartId = event.pathParameters.id;

    const foundItem = await OrderItem.findOne({ cart: cartId, pizza: pizza });

    if (foundItem) {
      //update orderItem
      foundItem.quantity = quantity;

      await foundItem.save();
    } else {
      // create a new order item
      const foundPizza = await Pizza.findById(pizza);

      const orderItem = await OrderItem.create({
        unitPrice: foundPizza.price,
        pizza: pizza,
        quantity,
        cart: cartId,
      });
      // save the new order item to the cart
      const cart = await Cart.findById(event.pathParameters.id);
      cart.orderItems.push(orderItem);
      await cart.save();
    }
    const result = await Cart.findById(event.pathParameters.id).populate(
      'orderItems'
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error(err.message ? err.message : err);
    return { status: 'Error', message: error.message ? error.message : error };
  }
};

module.exports.checkout = async (event) => {
  try {
    console.info('Checking event');
    if (!event) throw new Error('Event not found');

    await connectToDatabase();
    const cartId = event.pathParameters.id;
    const foundCart = await Cart.findById(cartId);
    const order = new Order({
      user: foundCart.user,
      orderItems: foundCart.orderItems,
    });
    await order.save();
    return {
      statusCode: 200,
      body: JSON.stringify(order),
    };
  } catch (err) {
    console.error(err.message ? err.message : err);
    return { status: 'Error', message: error.message ? error.message : error };
  }
};
