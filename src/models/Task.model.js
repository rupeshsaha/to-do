import mongoose, { Schema } from "mongoose"



const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ["study", "work", "personal"],
        required: true
    },
    timestamp: {
        type: Date,
        
    }
}, {
    timestamps: true
})

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema)
export default Task;