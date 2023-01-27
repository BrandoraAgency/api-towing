const { userLogin, userRegister, getUser, getUsers } = require("./user")
const { body } = require('express-validator');
const { fetchUser } = require("../middleware/userMiddleware");
module.exports=(app)=>{
    app.post('/api/login',body('email').isEmail(),body('password').isLength({ min: 3 }),fetchUser,userLogin)
    app.post('/api/register',userRegister)
    app.get('/api/user',getUsers)
    app.get('/api/logged',getUser)
}