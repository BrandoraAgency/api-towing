const { userLogin, userRegister, getUser } = require("./user")
const { body } = require('express-validator');
const { fetchUser } = require("../middleware/userMiddleware");
const { fetchRole } = require("../middleware/roleMiddleware");
module.exports=(app)=>{
    app.post('/login',body('email').isEmail(),body('password').isLength({ min: 3 }),fetchUser,fetchRole,userLogin)
    app.post('/register',userRegister)
    // app.post('/register',userRegister)
    app.get('/logged',getUser)
}