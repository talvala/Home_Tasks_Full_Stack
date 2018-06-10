const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const UserDAO = require('../models/userDAO');
const todoList = require('.././config/tasks-setup');
bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/login');
  } else {

    next();
  }
};

app.use((req,res,next) => {
  res.set("Content-Type", "application/json");
  next();
});

router.get('/', authCheck, (req, res) => {
  res.render('tasks', { user: req.user });
  //next();


});


/*

router.get('/', (req, res) => {
  res.render('stat');
 // UserDAO.getWeeklyScores().then(data=>res.json(data));
  //res.send("kfkf");
});
*/



/*router.get('/getWeeklyScores', (req, res) => {
       //	UserDAO.getWeeklyScores().then(data=>res.json(data));
       	res.send("im in statistics");
   //
});*/

app.use('/', router);


// auth login
//router.get('/getWeeklyScores', (req, res) => {//UserDAO.getWeeklyScores().then(data=>res.json(data))
//   //res.render('statistics', { user: req.user });
// res.redirect('/');

//});



module.exports = router;
