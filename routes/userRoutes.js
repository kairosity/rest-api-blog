const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


// GET REGISTER PAGE
router.get('/register', userController.register_user_page);

// POST REGISTER NEW USER
router.post('/register', userController.register_user);

// GET LOGIN 
router.get('/login', userController.login_page);

// POST LOGIN
router.post('/login', (request, response, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(request, response, next);
});

// GET USER DASHBOARD
router.get('/user-dashboard', userController.user_dashboard);


module.exports = router;