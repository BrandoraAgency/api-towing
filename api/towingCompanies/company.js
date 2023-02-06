const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { TowingCompany,Job } = require("../../models/Role")(sequelize, DataTypes);

const AddCompany = async (req, res) => {
  const companybody = req.body.company;
  const id = req.body.id;
  try {
    const company = await TowingCompany.create(companybody);
    await Job.update({
      towing_id:company.id
    }, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "Company Added",
      companyID: company.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Company Not Added",
    });
  }
};

const UpdateCompany = async (req, res) => {
  const companybody = req.body;
  console.log(companybody);
  try {
    await TowingCompany.update(companybody.company, {
      where: {
        id: companybody.company.id,
      },
    });
    res.status(200).json({
      message: "Company Updated",
    });
  } catch (error) {
    res.status(400).json({
      message: "Company Not Updated",
    });
  }
};
const GetCompany = async (req, res) => {
  try {
    const companies = await TowingCompany.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({
      message: "Company Not Found",
    });
  }
};
module.exports = {
  AddCompany,
  UpdateCompany,
  GetCompany
};
