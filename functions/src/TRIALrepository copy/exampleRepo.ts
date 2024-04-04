// interface UserActivityRepository {
//     create(userActivity: UserActivity): Promise<UserActivity>;
//     findAll(): Promise<UserActivity[]>;
//     findById(id: string): Promise<UserActivity | null>;
//     update(userId: string, userActivity: Partial<UserActivity>): Promise<UserActivity | null>;
//     delete(userId: string): Promise<void>;
//   }
//   interface RoutineRepository {
//     create(routine: Routine): Promise<Routine>;
//     findAll(): Promise<Routine[]>;
//     findById(routineId: string): Promise<Routine | null>;
//     update(routineId: string, routine: Partial<Routine>): Promise<Routine | null>;
//     delete(routineId: string): Promise<void>;
//   }
//   interface ExerciseRepository {
//     create(exercise: Exercise): Promise<Exercise>;
//     findAll(): Promise<Exercise[]>;
//     findById(exerciseId: string): Promise<Exercise | null>;
//     update(exerciseId: string, exercise: Partial<Exercise>): Promise<Exercise | null>;
//     delete(exerciseId: string): Promise<void>;
//   }
//   interface RepRepository {
//     create(rep: Rep): Promise<Rep>;
//     findAll(): Promise<Rep[]>;
//     findById(repId: string): Promise<Rep | null>;
//     update(repId: string, rep: Partial<Rep>): Promise<Rep | null>;
//     delete(repId: string): Promise<void>;
//   }


//   import mongoose, { Schema } from 'mongoose';
// const userActivitySchema = new Schema<UserActivity>({
//   userId: { type: String, required: true },
//   didExercise: { type: Boolean, required: true },
//   date: { type: Date, default: Date.now },
//   routines: [{ type: Schema.Types.ObjectId, ref: 'Routine' }] // Reference to Routine
// });
// const UserActivity = mongoose.model('UserActivity', userActivitySchema);
// export default UserActivity;


// import mongoose, { Schema } from 'mongoose';
// const routineSchema = new Schema<Routine>({
//   name: { type: String, required: true },
//   exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }] // Assuming exercises reference
// });
// const Routine = mongoose.model('Routine', routineSchema);
// export default Routine;