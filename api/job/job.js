const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { Job,JobLog,TowingCompany } = require("../../models/Role")(sequelize, DataTypes);

const getJobs = async (req, res) => {
  const role = req.query.role;
  try {
    let Jobs;
    if(req.session.user.role==='admin')
    {
       Jobs = await Job.findAll({
        include: [{ model: TowingCompany }]
      });
    }
    else{
       Jobs = await Job.findAll({ where: { assignto: role } ,
        include: [{ model: TowingCompany }]
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
const getApproved=async (req,res)=>{
  try {
    const Jobs = await Job.findAll({where: { isApproved: true } ,
      include: [{ model: TowingCompany }]
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
      message:'Approved not Found'
    })
  }
}
const getJobDetails = async (req, res) => {
  const id=req.query.id;
  console.log(id);
  try {
    const jobDetails = await Job.findOne({ where: { id: id } });
    const jobCompany = await TowingCompany.findOne({ where: { id: 3 } });
    const jobLog = await JobLog.findOne({ where: { jobId: jobDetails.id } });
    //* if checks
    if (jobDetails === null) return res.status(400).json({message:'Job Not Found'})
    //* else part
    res.status(200).json({
      job:jobDetails,
      jobCompany:jobCompany,
      log:jobLog
    })
  } catch (error) {
    res.status(400).json({
      message:'Not found'
    })
  }
};

const createJob = async (req, res) => {
  const newJob = req.body;
  try {
    console.log(newJob);
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
    res.status(200).json({
      message: "job Updated",
    });
  } catch (error) {
    res.status(400).json({
      message: "Job not Created",
    });
  }
};


const deleteJob = (req, res) => {};

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
  getApproved
};
