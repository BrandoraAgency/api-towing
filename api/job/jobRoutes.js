const { getJobs, getJobDetails, createJob, updateJob, deleteJob } = require("./job")

module.exports=(app)=>{
    app.get('/jobs',getJobs)
    app.get('/job',getJobDetails)
    app.post('/job',createJob)
    app.put('/job',updateJob)
    // app.delete('/job',deleteJob)
}
