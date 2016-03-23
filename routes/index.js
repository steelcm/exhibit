var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var completedRegistration = req.cookies.rs != undefined && req.cookies.rs === 'c'; // check if the user has already completed registration
    console.log('completedRegistraton = ' + completedRegistration)
    res.render('index', { title: 'Express', completed: completedRegistration });
});

// POST: register view (fallback for no JS)
router.post('/index/register', function(req, res, next) {
    console.log('req.body.email = ' + req.body.email);
    console.log('req.body.interest = ' + req.body.interest);
    res.cookie('rs', 'c', { maxAge: 900000, httpOnly: true }) // set cookie to denote completed form, rs == registration stage, c == completed
    res.redirect(301, '/');
});

// POST: register email
router.post('/api/register', function(req, res, next) {
    var transactionGuid = req.body.guid !== undefined ? req.body.guid : guid();
    var email = req.body.email !== undefined ? req.body.email : null;
    var interest = req.body.interest !== undefined ? req.body.interest : null;
    console.log('transaction.guid = ' + transactionGuid)
    console.log('req.body.email = ' + email);
    console.log('req.body.interest = ' + interest);
    res.json({'guid': transactionGuid, 'email': email, 'interest': interest })
});

module.exports = router;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
