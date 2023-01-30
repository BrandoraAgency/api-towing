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
  try {
    if (!req.user) return res.status(400).json({ message: 'Invalid Found' })
    const foundUser = req.user;
    req.session.user=foundUser;
    req.session.auth=true;
    res.status(200).json({
      userid: foundUser.id,
      emai: foundUser.email,
      role: foundUser.role,
      to:foundUser.passto,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName, 
    })
    
  } catch (error) {
    res.status(200).json({
      message:'user not found or error with the server'
    })
  }
};

const userRegister = async (req, res) => {
  try {
  const userBody = req.body;
  console.log(userBody);
  let password = crypto.createHash('md5').update(userBody.password).digest("hex")
  userBody.password=password;
    const user = await User.create(userBody);
    res.status(200).json({ message: 'user created', userId: user.id })
  } catch (error) {
    res.status(400).json({ message: 'user not created',error:error })
  }
};
const getUsers=async(req,res)=>{
  try {
    const users = await User.findAll({
      attributes: ["id","email","role"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: "users Not Found",
    });
  }
}

const logout=async(req,res)=>{
  try {
    if(req.session.user){
      req.session.user=null
      res.status(200).json({
        message:"Logged Out"
      })
    }
    else{
      res.status(200).json({
        message:"Session timeout"
      })
    }
  } catch (err) {
    res.status(200).json({
      message:"User not logeed out"
    })
  }
}
module.exports = {
  //on loggin user
  userLogin,
  //Create user on Register
  userRegister,
  //get user Info
  getUser,
  getUsers,
  logout
};
