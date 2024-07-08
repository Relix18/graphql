import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./graphql/schema/schema.js";
import { connectDB } from "./database/database.js";
import { getAllUsers, getUser, getUserAddress, } from "./controllers/userController.js";
dotenv.config({ path: "./.env" });
connectDB(process.env.MONGO_URI);
export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;
const graphqlServer = () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: {
            Query: {
                users: getAllUsers,
                user: (parent, args) => getUser(args.id),
                addresses: getUserAddress,
            },
            Addresses: {
                user: async (addresses) => {
                    return await getUser(addresses.user);
                },
            },
        },
    });
    return server;
};
const graphServer = graphqlServer();
await graphServer.start();
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/user", user);
// app.use(cors({origin:' * ',credentials:true}));
// app.use(morgan("dev"));
app.use("/graphql", expressMiddleware(graphServer));
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// your routes here
// app.get("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Page not found'
//   });
// });
// app.use(errorMiddleware);
app.listen(port, () => console.log("Server is working on Port:" + port + " in " + envMode + " Mode."));
