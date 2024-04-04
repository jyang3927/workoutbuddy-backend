import mongoose, { Schema } from 'mongoose';
import { User } from '../User';

const exerciseWithoutSetSchema = new Schema({
  // Assuming Exercise structure, omit 'sets'
  name: { type: String, required: true },
  type: { type: String, required: true },
  muscle: { type: String, required: true },
});

const userSchema = new Schema({
  uId: String,
  userName: { type: String, required: true },
  favExercises: [exerciseWithoutSetSchema], // Embedded documents
  favRoutines: [{ type: Schema.Types.ObjectId, ref: 'Routine' }], // References Routines collection
});

const User = mongoose.model<User>('User', userSchema);

export default User;