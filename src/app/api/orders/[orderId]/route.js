import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { getDataFromToken } from '@/lib/getDataFromToken';

// PATCH: Update a single order (admin only)
export async function PATCH(req, { params }) {
  await dbConnect();
  try {
    // Optionally, check admin privileges here
    const userId = await getDataFromToken(req);
    if (!userId) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const { orderId } = await params;
    const body = await req.json();
    const order = await Order.findById(orderId);
    if (!order) return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    // Only allow updating certain fields
    if (typeof body.isDelivered === 'boolean') order.isDelivered = body.isDelivered;
    if (typeof body.isPaid === 'boolean') order.isPaid = body.isPaid;
    // Optionally update other fields as needed
    await order.save();
    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
