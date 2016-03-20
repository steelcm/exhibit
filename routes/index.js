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

module.exports = router;
