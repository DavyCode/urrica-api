import mongoose from 'mongoose';

export type MongooseObjectId = mongoose.Types.ObjectId;

export type MomgooseUpdateOptions = { new: boolean; upsert: boolean };
