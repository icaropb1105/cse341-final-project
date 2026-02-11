const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    customerName: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'paid', 'shipped', 'cancelled']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
