const { Sequelize } = require("sequelize");

async function connectDatabase() {
  // Option 3: Passing parameters separately (other dialects)
  const database=process.env.LOCAL_DB;
  const user=process.env.LOCAL_USER;
  const pass=process.env.LOCAL_PASS;
  console.log(database, user, pass,process.env.LOCAL_HOST);
  const sequelize = new Sequelize(database, user, pass, {
    host: process.env.LOCAL_HOST,
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
