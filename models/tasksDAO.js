Task = require('../models/tasksModel');
User = require('../models/userModel');


module.exports = class userDAO {
  static getAllTasks(){
  	return Task.find()
  		.catch(() => error("err"));
  }

  static getAllAvailableTasks(){
  	return Task.find({status: 'available'}, 'name points time_to_complete')
  		.catch(() => error("err"));
  }

  static takeATask(taskId, usrName){
  	return Task.findOneAndUpdate({_id: taskId}, {$set: {"assignee": usrName},{"status": "taken"}}, {new: false})
  		.catch(() => error("err"));
  }

  static closeATask(taskId){	
  	return Task.findOneAndUpdate({_id: taskId}, {$set: {"status": "completed"}}, {new: false})
  		.catch(() => error("err"));
  }

};
