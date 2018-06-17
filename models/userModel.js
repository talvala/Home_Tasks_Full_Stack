const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    scores: Number,
    tasks: {
        taken_tasks: [],
        completed_tasks: [],
        tasks_counter: Number,
        tasks_per_day: Number
    },
    achievements: String
});



const User = mongoose.model('User', userSchema);

module.exports = User;