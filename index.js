const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const statisticsRoutes = require('./routes/statistics-routes');
const passportSetup = require('./config/passport-setup');
const tasksRoutes = require('./routes/tasks-routes');
const mongoose = require('mongoose').set('debug', true);;
const keys = require('./config/keys');
const UserDAO = require('./models/userDAO');
const TaskDAO = require('./models/tasksDAO');
const todoList = require('./config/tasks-setup');

bodyParser = require('body-parser');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;

// connect to mongodb
mongoose.connection.openUri(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
	
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//for debug
/*app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});*/

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/tasks', tasksRoutes);



//Homepage
app.get('/getAllScores', (req, res) => {
  UserDAO.getAllScores().then(data=>res.json(data));
});

app.get('/getAllAvailableTasks', (req, res) => {
  TaskDAO.getAllAvailableTasks().then(data=>res.json(data));
});

app.put('/takeATask', (req, res, next) => {
  var taskId = req.body.taskId;
  var usrName = req.body.usrName;
  TaskDAO.takeATask(taskId, usrName);
  next();
});

app.put('/takeATask', (req, res) => {
  var taskId = req.body.taskId;
  var usrId = req.body.usrId;
  UserDAO.takeATask(taskId, usrId).then(data=>res.json(data));
});

app.put('/closeATask', (req, res, next) => {
  var taskId = req.body.taskId;
  TaskDAO.closeATask(taskId);
  next();
});

app.put('/closeATask', (req, res) => {
  var usrId = req.body.usrId;
  var taskId = req.body.taskId;
  UserDAO.closeATask(taskId,usrId).then(data=>res.json(data));
});

// app.route('takeATask')
//   .get(UserDAO.takeATask(taskId, usrId))
//   .get(TaskDAO.takeATask(taskId, usrName))


// app.route('/takeATask')
//   .get(todoList.take_a_task)
//   .put(todoList.take_a_task)
//

//Profile
app.get('/getUserProfileSummary', (req, res) => {
  var usr = req.user;
  var usrid = usr.id;
  UserDAO.getUserProfileSummary(usrid).then(data=>res.json(data));
});
app.get('/getUserCompletedTasks', (req, res) => {
  var usr = req.user;
  var usrid = usr.id;
  UserDAO.getUserCompletedTasks(usrid).then(data=>res.json(data));
});
app.get('/getUserSavedTasks', (req, res) => {
  var usr = req.user;
  var usrid = usr.id;
  UserDAO.getUserSavedTasks(usrid).then(data=>res.json(data));
});
app.get('/getUserAchievments', (req, res) => {
  var usr = req.user;
  var usrid = usr.id;
  UserDAO.getUserAchievments(usrid).then(data=>res.json(data));
});
//

//Statistics (+getAllScores)
app.get('/mostTasksDoneSoFar', (req, res) => {
  UserDAO.mostTasksDoneSoFar().then(data=>res.json(data));
});

app.get('/getMedalist', (req, res) => {
  UserDAO.getMedalist().then(data=>res.json(data));
});
//

//Manage Tasks(+ )
app.route('/createTask')
  .post(todoList.create_a_task);

app.route('/tasks/:taskId')
  .get(todoList.read_a_task)
  .put(todoList.update_a_task)
  .delete(todoList.delete_a_task);

app.get('/getAllTasks', (req, res) => {
  TaskDAO.getAllTasks().then(data=>res.json(data));
});







// app.route('/getAllTasks')
//   .get(todoList.list_all_tasks);

// todoList Routes

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});



app.listen(process.env.PORT || 3030, () => {
    console.log('app now listening for requests on port 3030');
});
