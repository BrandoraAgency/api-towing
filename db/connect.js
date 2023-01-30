const { Sequelize } = require("sequelize");

async function connectDatabase() {
  // Option 3: Passing parameters separately (other dialects)
  const database=process.env.LIVE_DB;
  const user=process.env.LIVE_USER;
  const pass=process.env.LIVE_PASS;
  console.log(database, user, pass,process.env.LIVE_HOST);
  const sequelize = new Sequelize(database, user, pass, {
    host: process.env.LIVE_HOST,
    dialect:
      'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  });
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}
module.exports = {
  connectDatabase,
};
