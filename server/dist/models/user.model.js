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
    verified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
const addressSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: Number, required: true },
    },
});
export const User = model("User", userSchema);
export const Address = model("Address", addressSchema);
