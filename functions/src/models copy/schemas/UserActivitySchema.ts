import mongoose, { Schema } from 'mongoose';
import { IUserActivity } from '../IUserActivity';

const userActivitySchema = new Schema<IUserActivity>({
  uId: { type: String, required: true },
  workedOut: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
  routines: [{ type: Schema.Types.ObjectId, ref: 'Routine' }] 
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;