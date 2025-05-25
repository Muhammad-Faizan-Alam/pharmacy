import mongoose from "mongoose";

const connectdb = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to DB");
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to DB");
    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1); // Exit process if DB connection fails
    }
};

export default connectdb;