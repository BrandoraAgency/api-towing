const { AddLog } = require("./log")

module.exports=(app)=>{
    app.post('/log',AddLog)
}