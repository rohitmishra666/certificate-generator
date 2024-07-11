import mongoose from "mongoose";
import app from "./src/app.js";
import dotenv from "dotenv";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/certificate_tutedude`
        );
        console.log(
            `\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MONGO DB CONNECTION ERROR:", error);
        process.exit(1);
    }
};

dotenv.config();

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(` Server is running at ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB connection failed !!", err);
    });;

export default connectDB;