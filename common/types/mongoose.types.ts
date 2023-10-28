import mongoose from "mongoose";

export type MongooseDecimal128 = mongoose.Types.Decimal128;
export type MongooseObjectId = mongoose.Types.ObjectId;
export type MongooseUpdateOptions = { new: boolean; upsert: boolean };
