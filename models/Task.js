import mongoose, { Schema } from 'mongoose';

const TaskSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    column: {
        type: Number,
        required: true,
    },
    taskDeadline: {
        type: String,
        required: true,
    }
}, { timestamps: true }); //it gonna give created and updated at times

export default mongoose.model("Task", TaskSchema);