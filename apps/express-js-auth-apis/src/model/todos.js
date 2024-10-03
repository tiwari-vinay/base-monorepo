import mongoose from 'mongoose'

const todos = new mongoose.Schema({
    head: {type: String, required: true},
    body: { type: String },
});

export const TodoModel = new mongoose.model('Todo',todos); 