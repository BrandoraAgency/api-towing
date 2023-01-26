const { Sequelize } = require("sequelize");

async function connectDatabase(app) {
  // Option 3: Passing parameters separately (other dialects)
  const database=`ntllkemy_towing`;
  const user=`ntllkemy_towing1`;
  const pass=`db.towing$record1`;
  console.log(database, user, pass);
  const sequelize = new Sequelize(database, user, pass, {
    host: `localhost`,
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
