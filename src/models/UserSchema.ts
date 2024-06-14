import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface User extends Document {
   username: string,
   password: string,
   email: string,
   isverified: boolean,
   linkedin?: string,
   github?: string,
   bio?: string,
   profileimage?: string,
   participatedmember?: [],
   createdteam?: [],
   applyingteam?: []
}

const userDetailSchema: Schema<User> = new mongoose.Schema({
    username: {
       type: String,
       required: true
   },
   password: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true
   },
   isverified: {
       type: Boolean,
       default: false
   },
   linkedin: { type: String },
   github: String,
   bio: String,
   profileimage: String,
   participatedmember: [],
   createdteam: [],
   applyingteam: [],
}, {
   timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', userDetailSchema);
export default UserModel;
