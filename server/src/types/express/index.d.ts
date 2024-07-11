import { IUser } from "../../models/userModel.js"; // Adjust the import path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Adjust the type based on your user model
    }
  }
}
