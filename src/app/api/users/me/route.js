import { getDataFromToken } from "../../../../lib/getDataFromToken";
import User from "../../../../models/User";
import dbconnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

await dbconnect();

export async function POST(request) {
    // extract data from token
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ message: "User found", data: user }, { status: 200 });
}