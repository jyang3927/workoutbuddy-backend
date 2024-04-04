import mongoose, { Schema } from 'mongoose';
import { Routines } from '../Routines';

const routineSchema = new Schema<Routines>({
    uId: { type: String, required: true },
    routineName: { type: String, required: true},
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }] 
});
const Routine = mongoose.model('Routine', routineSchema);

export default Routine;