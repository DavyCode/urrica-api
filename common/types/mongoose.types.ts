import mongoose from 'mongoose';

export type MongooseObjectId = mongoose.Types.ObjectId;

export type MongooseUpdateOptions = { new: boolean; upsert: boolean };
