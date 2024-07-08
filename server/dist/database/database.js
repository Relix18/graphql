import mongoose from "mongoose";
export const connectDB = (uri) => {
    mongoose
        .connect(uri, {
        dbName: "techydeals",
    })
        .then((data) => console.log(`MongoDB connected: ${data.connection.host}`));
};
