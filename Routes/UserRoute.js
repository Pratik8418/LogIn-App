const routes = require('express').Router();
const {registerUser, loginUser, getUser} = require('../Controllers/UserCtrl');
const {authMiddleware} = require('../Middleware/AuthMiddleware');

routes.post('/register',registerUser);
routes.post('/login',loginUser);
routes.get('/user', authMiddleware ,getUser);

module.exports = routes;