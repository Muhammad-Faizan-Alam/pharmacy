import { NextResponse } from "next/server";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/lib/mailer";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, email, password } = body;

        // Validate email and password
        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }


        const salt = bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, await salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const saveUser = await newUser.save();
        console.log("User signed up successfully:", saveUser);

        // Send a verification email
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: saveUser._id,
        });
        return NextResponse.json({ message: "User signed up successfully, verification email sent" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}