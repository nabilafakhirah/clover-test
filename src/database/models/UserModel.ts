import { Document, model, Schema } from "mongoose";

export interface UserInt extends Document {
    discordId: string,
    currency: number,

    lastDaily: number,
    dropNext: string,
    claimNext: string,
    dailyStreak: number,

    privateInv: boolean,
    ban: boolean
}

export const User = new Schema({
    discordId: String,
    currency: Number,

    lastDaily: Number,
    dropNext: String,
    claimNext: String,
    dailyStreak: Number,

    privateInv: Boolean,
    ban: Boolean
});

export default model<UserInt>("user", User);