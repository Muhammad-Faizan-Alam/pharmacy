import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function GET(request) {
    try {
        // Clear the token cookie
        const response = NextResponse.json({ message: "Logout successful", success: true });
        response.cookies.set({
            name: "token",
            value: "",
            httpOnly: true,
            expires: new Date(0), // Set expiration to the past to clear the cookie
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}