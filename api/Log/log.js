const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { JobLog ,LogChange} = require("../../models/Role")(sequelize, DataTypes)

const AddLog = async (req, res) => {
    const logBody = req.body;
    try {
      const log = await JobLog.create(logBody);
      res.status(200).json({
        message: "Log Added",
        logID: log.id,
      });
    } catch (error) {
      res.status(400).json({
        message: "Log Not Added",
      });
    }
  };
  module.exports={
    AddLog
  }