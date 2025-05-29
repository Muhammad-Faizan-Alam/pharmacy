import { NextResponse } from "next/server";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/lib/mailer";
import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate email and password
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Check if the user is verified
        if (!user.isVerfied) {
            return NextResponse.json({ error: "User not verified" }, { status: 403 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        const response = NextResponse.json( {
            message: "Login successful",
            success: true,
            token,
        });
        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            // sameSite: "strict",
            // maxAge: 60 * 60, // 1 hour
        });

        return NextResponse.json({ message: "Login successful", userId: user._id }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}