import mongoose from "mongoose";
export const connectDB = (uri) => {
    mongoose
        .connect(uri, {
        dbName: "graphql",
    })
        .then((data) => console.log(`MongoDB connected: ${data.connection.host}`));
};
