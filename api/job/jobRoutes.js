const { getJobs, getJobDetails, createJob, updateJob, deleteJob, getApproved, getJob } = require("./job")

module.exports=(app)=>{
    app.get('/api/jobs',getJobs)
    app.get('/api/jobByStatus',getApproved)
    app.get('/api/job',getJobDetails)
    app.get('/api/editJob',getJob)
    app.post('/api/job',createJob)
    app.put('/api/job',updateJob)
    app.delete('/api/job',deleteJob) 
}
