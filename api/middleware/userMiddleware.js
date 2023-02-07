const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { User } = require("../../models/Role")(sequelize, DataTypes);
const { validationResult } = require("express-validator");
const crypto = require("crypto");

const fetchUser = async (req, res, next) => {
  try {
    const bodyErr = validationResult(req);
    //body error
    if (!bodyErr.isEmpty())
      return res.status(400).json({ errors: bodyErr.array() });
    // find user
    let authUser = req.body;
    authUser.password = crypto
      .createHash("md5")
      .update(authUser.password)
      .digest("hex");
    const user = await User.findOne({
      where: { email: authUser.email, password: authUser.password },
    });
    if (user === null) {
      res.status(400).json({ message: "User not Found" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "error in finding user",
      error:error
    });
  }
};
const userAccess = async (req, res, next) => {
  try {
    const role = req.body.role;
    if (role) {
      if (role === "admin") {
        req.body.passto = "admin";
        req.body.access = "jobList,approved,company,stat";
      } else if (role === "accountant") {
        req.body.passto = "admin";
        req.body.access = "jobList,approved";
      } else if (role === "qc") {
        req.body.access = "jobList,";
        req.body.passto = "accountant";
      } else if (role === "dispatch") {
        req.body.passto = "qc";
        req.body.access = "newJob,jobList,company";
      } else if (role === "sales") {
        req.body.access = "newJob";
        req.body.passto = "dispatch";
      }
      next();
    } else {
      res.status(400).json({
        message: "role not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Try Again",
    });
  }
};
module.exports = {
  //find user
  fetchUser,
  userAccess,
};
