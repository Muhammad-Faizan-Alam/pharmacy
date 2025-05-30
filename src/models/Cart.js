const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
}, { _id: false });

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  items: {
    type: [cartItemSchema],
    default: [],
  },
  status: {
    type: String,
    enum: ['active', 'ordered', 'abandoned'],
    default: 'active',
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);