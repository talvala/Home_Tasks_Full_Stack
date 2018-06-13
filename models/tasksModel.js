'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'please enter the name of the task'
  },
  date: {
    created_date: {type: Date, default:Date.now},
    taken_date: {type: Date, default: null}
  },
  /*status: {
    type: String,
    default: 'Available'
  }*/
  category: {
    type:String,
    required: 'please enter the category of the task'
  },
  points: {
    type:Number,
    required: 'please enter the points of the task'
  },
  assignee: String, //id of user
  isTimeLimited:{
    type:Boolean,
    default:false
  },
  status: {
    type: String,
    enum: ['available', 'taken', 'completed'],
    default: 'available'
  },


});

module.exports = mongoose.model('Tasks', TaskSchema);