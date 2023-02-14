const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { AddLog } = require("../Log/log");
const { Job, Company, JobLog, LogChange, TowingCompany, TowImage, TowReceipt } = require("../../models/Role")(sequelize, DataTypes);

const getJobs = async (req, res) => {
  const role = req.query.role;
  try {
    let Jobs;
    if (req.session.user.role === "admin") {
      Jobs = await Job.findAll({
        include: [{ model: TowingCompany }],
      });
    } else {
      Jobs = await Job.findAll({
        where: { assignto: role },
        include: [{ model: TowingCompany }],
      });
    }
    if (Jobs === null) {
      res.status(400).json({
        message: "Not Found",
      });
    } else {
      res.status(200).json(Jobs);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Jobs Not Found",
    });
  }
};
const getApproved = async (req, res) => {
  const jobstatus = req.query.status;
  try {
    const Jobs = await Job.findAll({
      where: { jobStatus: jobstatus },
      include: [{ model: TowingCompany }],
    });
    if (Jobs === null) {
      res.status(400).json({
        message: "Not Found",
      });
    } else {
      res.status(200).json(Jobs);
    }
  } catch (error) {
    res.status(400).json({
      message: "Approved not Found",
    });
  }
};
const getJobDetails = async (req, res) => {
  const id = req.query.id;
  try {
    const jobDetails = await Job.findOne({
      where: { id: id },
      include: [
        { model: TowingCompany },
        { model: JobLog, include: [{ model: LogChange }] },
        { model: TowImage },
        { model: TowReceipt },
      ],
    });
    //* if checks
    if (jobDetails === null)
      return res.status(400).json({ message: "Job Not Found" });
    //* else part
    res.status(200).json({
      job: jobDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Not found",
    });
  }
};

const getJob = async (req, res) => {
  const id = req.query.id;
  try {
    const jobDetails = await Job.findOne({
      where: { id: id },
      include: [{ model: TowingCompany, include: [{ model: Company }] }],
    });
    //* if checks
    if (jobDetails === null)
      return res.status(400).json({ message: "Job Not Found" });
    //* else part
    res.status(200).json({
      job: jobDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Not found",
    });
  }
};
const createJob = async (req, res) => {
  const newJob = req.body;
  try {
    const createdJob = await Job.create(newJob);
    res.status(200).json({
      message: "job created",
      jobId: createdJob.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Job not Created",
    });
  }
};

const updateJob = async (req, res) => {
  const Jobupdates = req.body.job;
  const id = req.body.id;
  try {
    await Job.update(Jobupdates, {
      where: {
        id: id,
      },
    });
    await AddLog(req.session.user.role, id, Jobupdates);
    res.status(200).json({
      message: "job Updated",
    });
  } catch (error) {
    res.status(400).json({
      message: "Job not Created",
    });
  }
};

const deleteJob = async(req, res) => {
  const id= req.query.id;
  try {
    await Job.destroy({
      where: {
        id: id
      }
    });
    res.status(200).json({
      message:'Job Deleted'
    })
  } catch (error) {
    res.status(400).json({
      message:'Job not Deleted'
    })
  }
};

module.exports = {
  //get jobs list
  getJobs,
  //get single job details
  getJobDetails,
  //create new job
  createJob,
  //update job
  updateJob,
  //delete job
  deleteJob,
  getApproved,
  getJob,
};
