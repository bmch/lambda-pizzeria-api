const mongoose = require('mongoose');
const Pizza = require('./pizza');

const orderItemSchema = new mongoose.Schema(
  {
    pizza: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pizza',
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderItemSchema.virtual('total').get(function () {
  return this.unitPrice * this.quantity;
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    discountAmount: { type: Number, default: 0 },
    cartAmount: { type: Number, default: 0 },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.virtual('baseAmount').get(function () {
  if (!this.orderItems.length) return 0;
  return this.orderItems.map((o) => o.total).reduce((a, b) => a + b);
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
const Cart = mongoose.model('Cart', cartSchema);

module.exports = { OrderItem, Cart, Order };
