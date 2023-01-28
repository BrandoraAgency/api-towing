const { userLogin, userRegister, getUser, getUsers, logout } = require("./user")
const { body } = require('express-validator');
const { fetchUser, userAccess } = require("../middleware/userMiddleware");
module.exports=(app)=>{
    app.post('/api/login',body('email').isEmail(),body('password').isLength({ min: 3 }),fetchUser,userLogin)
    app.post('/api/register',userAccess,userRegister)
    app.get('/api/user',getUsers)
    app.get('/api/logged',getUser)
    app.get('/api/logout',logout)
}