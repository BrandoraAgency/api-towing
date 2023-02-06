const { DataTypes, where } = require("sequelize");
const { sequelize } = require("../../models");
const { Role } = require("../../models/Role")(sequelize, DataTypes);

const fetchRole = async (req, res, next) => {
  if (!req.user) return res.status(400).json({ message: "Invalid Found" });
  const user = req.user;
  const role = await Role.findOne({
    attributes: ["type"],
    where: { id: user.role},
  });
  if (role === null) {
    res.status(400).json({ message: "Role not Found" });
  } else {
    req.role = role.type;
    next(); 
  }
};
module.exports={
    fetchRole
}
