
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
  static getUserProfileSummary(usrid){
      console.log("getting profile summary");
        // console.log(usrid);
        // return User.find( {_id: usrid}, {'scores': 1, 'tasks.completed_tasks': 1 , 'achievments.length': 1})
        //              .catch(() => error("err"));
    var length = User.aggregate([
           { $project: {
            achievments: {$size: "$achievments"},
            tasks_done: {$size: "$tasks.completed_tasks"}}
          }
       ])
    var scores = User.find({_id: usrid}, 'scores');

     console.log(JSON.stringify(length));
     return length;

    // JSON.stringify(length);
    // JSON.stringify(scores);
    // console.log(length);
    // console.log(scores);
    
    }
    static getUserCompletedTasks(usrid){
      console.log("getting completed tasks");
      return User.find({_id: usrid}, 'tasks.completed_tasks')
            .catch(() => error("err"));
    }
    static getUserSavedTasks(usrid){
      console.log("getting saved tasks");
      return User.find({_id: usrid}, 'tasks.taken_tasks')
            .catch(() => error("err"));
    }
    static getUserAchievments(usrid){
      console.log("getting achievments");
      return User.find({_id: usrid}, 'achievments')
            .catch(() => error("err"));
    }
    static getAllScores(){
        console.log("getting all scores");
        return User.find({}, 'name scores')
                    .catch(() => error("err"));

    }
};