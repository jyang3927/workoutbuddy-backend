import mongoose, { Schema } from 'mongoose';
import { ISet } from '../ISet';


const setSchema = new Schema<ISet>({
    uId: { type: String, required: true }
});
const Set = mongoose.model('Set', setSchema);

export default Set;