import mongoose, { Schema } from 'mongoose';
import { Set } from '../Set';

const setSchema = new Schema<Set>({
    uId: { type: String, required: true },
    setNumber: { type: Number, required: true },
    weight: { type: Number, required: false },
    reps: { type: Number, required: false },
    time: { type: Number, required: false },
    distance: { type: Number, required: false }, 
});
const Set = mongoose.model('Set', setSchema);

export default Set;