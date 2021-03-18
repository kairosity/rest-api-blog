const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


// GET REGISTER PAGE
router.get('/register', userController.register_user_page);

// POST REGISTER NEW USER
router.post('/register', userController.register_user);

// GET LOGIN 
router.get('/login', userController.login_page);

// POST LOGIN
router.post('/login', userController.login_user);


module.exports = router;