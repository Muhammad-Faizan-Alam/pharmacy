import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  img: {
    type: String,
    required: [true, 'Product image URL is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    lowercase: true,
  },
  type: {
    type: String,
    required: [true, 'Product type is required'],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be at least 0'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock count is required'],
    min: [0, 'Stock cannot be negative'],
  },
}, {
  timestamps: true,
});

// Prevent model overwrite error in development
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;