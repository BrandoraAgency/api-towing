const { userLogin, userRegister, getUser, getUsers } = require("./user")
const { body } = require('express-validator');
const { fetchUser } = require("../middleware/userMiddleware");
module.exports=(app)=>{
    app.post('/login',body('email').isEmail(),body('password').isLength({ min: 3 }),fetchUser,userLogin)
    app.post('/register',userRegister)
    app.get('/user',getUsers)
    app.get('/logged',getUser)
}