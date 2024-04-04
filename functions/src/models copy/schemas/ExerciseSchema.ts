import mongoose, { Schema } from 'mongoose';
import IExercise from '../IExercise';

const exerciseSchema = new Schema<IExercise>({
    uId: { type: String, required: true },
    exerciseName: { type: String, required: true},
    exerciseType: { type: String, required: true},
    exerciseMuscle: { type: String, required: true},
    favoriteExercise: { type: Boolean, required: true}, 
    sets: [{ type: Schema.Types.ObjectId, ref: 'Set' }] 
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;