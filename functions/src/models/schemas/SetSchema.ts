import mongoose, { Schema } from 'mongoose';
import { Set } from '../Set';

const setSchema = new Schema<Set>({
    uId: { type: String, required: true },
    setNumber: { type: Number, required: true },
    weight: { type: Number, required: true },
    reps: { type: Number, required: true },
    time: { type: Number, required: true },
    distance: { type: Number, required: true }, 
});
const Set = mongoose.model('Set', setSchema);

export default Set;