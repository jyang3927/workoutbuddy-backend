import mongoose, { Schema } from 'mongoose';
import { IRoutine } from '../IRoutine';


const routineSchema = new Schema<IRoutine>({
    uId: { type: String, required: true },
    routineName: { type: String, required: true},
    favoriteRoutine: { type: Boolean, required: true}, 
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }] 
});
const Routine = mongoose.model('Routine', routineSchema);

export default Routine;