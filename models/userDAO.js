
User = require('../models/userModel');
Tasks = require('../models/tasksModel');


module.exports = class userDAO {
    static mostPointsThisWeek() {
        return User.find().sort({scores: 'desc'})
                   .catch(() => error("bla"));
    }

  static mostTasksDoneSoFar() {
    return User.find().sort({scores: 'desc'})
      .catch(() => error("bla"));
  }

  static TasksPerDay() {
    return User.find({}, 'name scores')
      .catch(() => error("bla"));
  }

  static TheMedalists() {
    return User.find().sort({scores: 'desc'})
      .catch(() => error("bla"));
  }

  //Tal:
  static getUserProfileSummary(){
      console.log("getting profile summary");
        // console.log(usrid);
        return User.find( {username: 'Elaya Gabay'}, 'scores')
                     .catch(() => error("err"));

    }
    static getUserCompletedTasks(){
      console.log("getting completed tasks");
      return User.find({username: user.thumbnail}, 'completedtasks')
            .catch(() => error("err"));
    }
    static getUserSavedTasks(){
      console.log("getting saved tasks");
      return User.find()
            .catch(() => error("err"));
    }
    static getUserAchievments(){
      console.log("getting achievments");
      return User.find()
            .catch(() => error("err"));
    }
    static getAllScores(){
        console.log("getting all scores");
        return User.find({}, 'name scores')
                    .catch(() => error("err"));

    }
};