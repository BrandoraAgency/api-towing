const { getJobs, getJobDetails, createJob, updateJob, deleteJob } = require("./job")

module.exports=(app)=>{
    app.get('/api/jobs',getJobs)
    app.get('/api/job',getJobDetails)
    app.post('/api/job',createJob)
    app.put('/api/job',updateJob)
    // app.delete('/job',deleteJob)
}
