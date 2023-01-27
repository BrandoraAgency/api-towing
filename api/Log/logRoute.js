const { AddLog } = require("./log")

module.exports=(app)=>{
    app.post('/api/log',AddLog)
}