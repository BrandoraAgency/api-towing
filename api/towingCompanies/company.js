const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../models");
const { TowingCompany, Job, Company, Rating } = require("../../models/Role")(
  sequelize,
  DataTypes
);

const AddCompany = async (req, res) => {
  const companybody = req.body.company;
  const id = req.body.id;
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
  console.log(companybody);
  try {
    if(JSON.stringify(companybody.company) === "{}") return res.sendStatus(200)
    if(companybody.company.phone)
    {
      const company = await Company.findOne({
        where: { phone: companybody.company.phone },
      });
      if (company === null) {
        const newCompany = await Company.create({ phone: companybody.company.phone });
        delete req.body.company.phone;
        req.body.company.companyId = newCompany.id;
        next();
      } else {
        delete req.body.company.phone;
        req.body.company.companyId = company.id;
        next();
      }
    }
    else{
      res.status(400).json({
        message: "Phone Null",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Company Middleware Issue",
    });
  }
};
const addrating = async (req, res) => {
  const rating = req.body;
  try {
    const ratingId = await Rating.findOne({
      where: { companyId: rating.companyId, user: rating.user },
    });
    if (ratingId === null) {
      const newrating = await Rating.create(rating);
    } else {
      await Rating.update(
        { rating: rating.rating },
        {
          where: {
            id: ratingId.id,
          },
        }
      );
    }
    res.status(200).json({
      message: "Rating Added",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Rating Not Added",
    });
  }
};
const UpdateCompany = async (req, res) => {
  const companybody = req.body;
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
          attributes: ["name", "zipCode"],
          group: ["companyId"],
          limit: 1,
        },
        {
          model: Rating,
          attributes: [
            [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
            [sequelize.fn("GROUP_CONCAT", sequelize.col("user")), "users"],
          ],
          required: false,
          duplicating: false,
          group: ["companyId"],
        },
      ],
      group: ["company.id"],
      // raw: true
    });
    res.status(200).json(companies);
  } catch (error) {
    console.log(error);
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
