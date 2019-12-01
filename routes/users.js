var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

//use sequalize to connect mysql database with ORM
//connect to marker db path
const sequelize = new Sequelize('mysql://root@127.0.0.1:3306/test');

//check wether the connection has been made
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
  firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
   }
});

router.get('/', function(req, res, next) {
  User.findAll({attributes: ['firstname', 'lastname', 'email']}).then(users => {

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      //put the query result to array
      const result = []
      users.forEach(function(user) {
         result.push({
             user: {
                 first: user.firstname,
                 last: user.lastname,
                 email: user.email,
             },
         })
      })
      //send respond back to react server
      res.json(result);
  })
});
module.exports = router;
