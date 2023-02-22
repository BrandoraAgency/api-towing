const { nodeMail, sendmail } = require("./Email")

module.exports=(app)=>{
    app.post('/api/email' ,nodeMail,sendmail)
}   