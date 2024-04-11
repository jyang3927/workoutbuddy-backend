import mongoose, { Schema } from 'mongoose';
import { Exercise } from '../Exercise';

const exerciseSchema = new Schema<Exercise>({
    uId: { type: String, required: true },
    name: { type: String, required: true},
    type: { type: String, required: true},
    muscle: { type: String, required: true},
    sets: [{ type: Schema.Types.ObjectId, ref: 'Set' }], 
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;