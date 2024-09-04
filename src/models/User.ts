import mongoose, { Schema, model } from "mongoose";

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Merging IUser interface with mongoose's Document interface to create
// a new interface that represents a user document in MongoDB
// interface IUserDocument extends IUser, Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  // Automatically add 'createdAt' and 'updatedAt' fields to the document
  { timestamps: true }
);

const UserModel = mongoose.models.User || model<IUser>("User", userSchema);

export default UserModel;
