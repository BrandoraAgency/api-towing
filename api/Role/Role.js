const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { Role } = require("../../models/Role")(sequelize, DataTypes);

const getRoles = async (res, req) => {
  try {
    const role = await Role.findAll();
    req.status(200).json(role)
  } catch (error) {
    
    req.status(400).json({
      message:"Not Found"
    })
  }
};
const CreateRoles = async (res, req) => {
  const rolebody=res.body;
  try {
    const role = await Role.create(rolebody);
    req.status(200).json({
      roleID:role.id
    })
    
  } catch (error) {
    req.status(400).json({
      message:"Not Created"
    })
  }
};
module.exports={
    //get all the roles
    getRoles,
    CreateRoles
}