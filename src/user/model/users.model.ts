import mongoose from "mongoose";
import { UserSchema } from "./users.schema";
import { IUserDocument } from "./users.types";

export default mongoose.model<IUserDocument>("users", UserSchema);
