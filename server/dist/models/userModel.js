import { model, Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        default: "New User",
        minLength: [4, "Please Enter more than 4 characters."],
        maxLength: [30, "Name cannot contain more than 30 characters."],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
});
export const User = model("User", userSchema);
