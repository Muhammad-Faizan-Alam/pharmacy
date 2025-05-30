import {  NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

await dbConnect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        console.log("Received token:", token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        }
        )
        if (!user) {
            console.log("Invalid or expired token");
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }
        console.log("user", user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/users/verifyemail:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}