import mongoose from "mongoose";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "graphql",
    })
    .then((data) => console.log(`MongoDB connected: ${data.connection.host}`));
};
