import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, required: true, max: 30 },
  lastName: { type: String, required: true, max: 30 },
  email: { type: String, required: true, unique: true},
  userName: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: false, default: "user" },
});

console.log ("Schema creado!")
export const userModel = model("users", UserSchema);
