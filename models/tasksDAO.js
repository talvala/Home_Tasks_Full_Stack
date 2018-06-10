Tasks = require('../models/tasksModel');


module.exports = class userDAO {
  static addNewTask() {
    return User.find().sort({scores: 'desc'})
      .catch(() => error("bla"));
  }

};