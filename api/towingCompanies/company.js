const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { TowingCompany, Job, Company, Rating } = require("../../models/Role")(
  sequelize,
  DataTypes
);

const AddCompany = async (req, res) => {
  const companybody = req.body.company;
  const id = req.body.id;
  console.log(companybody);
  try {
    const company = await TowingCompany.create(companybody);
    await Job.update(
      {
        towing_id: company.id,
      },
      {
        where: {
          id: id,
        },
      }
    );
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
const checkCompany = async (req, res, next) => {
  const companybody = req.body.company;
  try {
    const company = await Company.findOne({
      where: { phone: companybody.phone },
    });
    if (company === null) {
      console.log("done");
      const newCompany = await Company.create({ phone: companybody.phone });
      delete req.body.company.phone;
      req.body.company.companyId = newCompany.id;
      next();
    } else {
      console.log("not");
      delete req.body.company.phone;
      req.body.company.companyId = company.id;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Company Middleware Issu",
    });
  }
};
const addrating = async (req, res) => {
  const rating = req.body;
  try {
    const newrating = await Rating.create(rating);
    res.status(200).json({
      message: "Rating Added",
      ratingid: newrating.id,
    });
  } catch (error) {
    res.status(400).json({
      message: "Rating Not Added",
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
    const companies = await Company.findAll({
      include: [
        {
          model: TowingCompany,
          limit: 1,
        },
        
      ],
    });
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({
      message: "Company Not Found",
    });
  }
};
module.exports = {
  AddCompany,
  addrating,
  UpdateCompany,
  GetCompany,
  checkCompany,
};
