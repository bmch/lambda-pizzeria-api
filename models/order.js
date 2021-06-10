const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    base_amount: Number,
    discount_amount: Number,
    cart_amount: Number,
    order_items: { type: [orderItemSchema] },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Cart', orderSchema);
