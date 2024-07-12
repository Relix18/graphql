import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./graphql/schema/schema.js";
import { connectDB } from "./database/database.js";
import { resolver } from "./graphql/resolvers/resolver.js";
import cookieParser from "cookie-parser";
import user from "./routes/userRoute.js";
import { authMiddleware } from "./middlewares/auth.js";
dotenv.config({ path: "./.env" });
connectDB(process.env.MONGO_URI);
export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;
export const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Create a new ApolloServer instance with the necessary configuration
const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
    context: ({ req, res }) => ({
        req,
        res,
        user: req.user,
    }),
});
// app.use(authMiddleware);
// Start the ApolloServer
await server.start();
// Apply ApolloServer middleware to the Express app
app.use("/graphql", expressMiddleware(server, {
    context: authMiddleware,
}));
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use("/api/v1/user", user);
app.get("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found",
    });
});
app.use(errorMiddleware);
app.listen(port, () => console.log(`Server is working on Port: ${port} in ${envMode} Mode.`));
