// GET: Fetch the current user's cart (auto-creates if not found).
// POST: Add a product to the cart or update its quantity.
// PATCH: Update the quantity of a cart item or the cart status.
// DELETE: Remove a product from the cart or clear the cart.
import dbConnect from '@/lib/dbConnect';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { getDataFromToken } from '@/lib/getDataFromToken';
import { NextResponse } from 'next/server';

// Helper: get userId from request
async function getUserId(request) {
  const userData = await getDataFromToken(request);
  if (!userData) throw new Error('Unauthorized');
  return userData;
}

// GET: Get current user's cart
export async function GET(request) {
  try {
    await dbConnect();
    const userId = await getUserId(request);
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [], total: 0 });
    }
    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}

// POST: Add item to cart (or update quantity if exists)
export async function POST(request) {
  try {
    await dbConnect();
    const userId = await getUserId(request);
    const { productId, quantity = 1 } = await request.json();
    if (!productId) throw new Error('Product ID required');
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [], total: 0 });
    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = product.price;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// PATCH: Update item quantity or cart status
export async function PATCH(request) {
  try {
    await dbConnect();
    const userId = await getUserId(request);
    const { productId, quantity, status } = await request.json();
    let cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');
    if (productId && typeof quantity === 'number') {
      const item = cart.items.find(i => i.product.toString() === productId);
      if (!item) throw new Error('Item not found in cart');
      item.quantity = quantity;
    }
    if (status) cart.status = status;
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// DELETE: Remove item from cart or clear cart
export async function DELETE(request) {
  try {
    await dbConnect();
    const userId = await getUserId(request);
    const { productId } = await request.json();
    let cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');
    if (productId) {
      cart.items = cart.items.filter(i => i.product.toString() !== productId);
    } else {
      cart.items = [];
    }
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
