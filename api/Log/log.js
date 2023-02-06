const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { JobLog, LogChange } = require("../../models/Role")(
  sequelize,
  DataTypes
);

const AddLog = async (action,jobID, logs) => {
  const newJobLog = {
    actions: action,
    jobId: jobID,
    date: new Date(),
    user: 'admin',
  };
  await JobLog.create(newJobLog)
    .then((createdJobLog) => {
      let logsChanges=[];
      for (let key in logs) {
        logsChanges.push({
          changes:key+'----'+logs[key],
          logId:createdJobLog.id
        })
      }
      return LogChange.bulkCreate(logsChanges);
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
     return false
    });
};
module.exports = {
  AddLog,
};
