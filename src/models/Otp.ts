
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface Otp extends Document {
    email: string,
    otp: string,
    expiry: Date,
}

const otpDetailSchema: Schema<Otp> = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiry: {
        type: Date
    }
}, {
    timestamps: true
});

export const OtpModel = mongoose.models.Otp || mongoose.model<Otp>('Otp', otpDetailSchema);
