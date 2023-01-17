const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { TowingCompany } = require("../../models/Role")(sequelize, DataTypes)