import mongoose, { Schema } from 'mongoose';
import { UserActivity } from '../UserActivity';

const userActivitySchema = new Schema<UserActivity>({
  uId: { type: String, required: true },
  workedOut: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
  routines: [{ type: Schema.Types.ObjectId, ref: 'Routine' }] 
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;