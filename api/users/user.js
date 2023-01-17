const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const crypto = require('crypto')
const { User } = require("../../models/Role")(sequelize, DataTypes);


const getUser = (req, res) => {
  if(!req.session.user){
    res.status(400).json({
      message:'not logged'
    })
  }
  else{
    res.status(200).json({
      message:'logged'
    })
  }
};

const userLogin = (req, res) => {
  if (!req.user) return res.status(400).json({ message: 'Invalid Found' })
  const foundUser = req.user;
  const role = req.role;
  req.session.user=foundUser;
  req.session.auth=true;
  res.status(200).json({
    userid: foundUser.id,
    emai: foundUser.email,
    role: role,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName, 
  })
};

const userRegister = async (req, res) => {
  const userBody = req.body;
  let password = crypto.createHash('md5').update(userBody.password).digest("hex")
  try {
    const user = await User.create({
      firstName: userBody.firstName,
      lastName: userBody.lastName,
      email: userBody.email,
      password: password,
      role: userBody.role,
    });
    res.status(200).json({ message: 'user created', userId: user.id })
  } catch (error) { }
};

module.exports = {
  //on loggin user
  userLogin,
  //Create user on Register
  userRegister,
  //get user Info
  getUser
};
