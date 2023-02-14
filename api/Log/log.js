const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { JobLog, LogChange } = require("../../models/Role")(
  sequelize,
  DataTypes
);

const AddLog = async (role, action, jobID, logs) => {
  try {
    if (JSON.stringify(logs) !== "{}") {
      const newJobLog = {
        actions: action,
        jobId: jobID,
        date: new Date(),
        user: role,
      };
      console.log(newJobLog);
      await JobLog.create(newJobLog)
        .then((createdJobLog) => {
          let logsChanges = [];
          for (let key in logs) {
            logsChanges.push({
              changes: key + "----" + logs[key],
              logId: createdJobLog.id,
            });
          }
          return LogChange.bulkCreate(logsChanges);
        })
        .then(() => {
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  AddLog,
};
