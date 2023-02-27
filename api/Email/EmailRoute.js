const { deleteDispatchTicket } = require("../DispatchTicket/Ticket")
const { nodeMail, sendmail, sendDispatch } = require("./Email")

module.exports=(app)=>{
    app.post('/api/email' ,nodeMail,sendmail)
    app.post('/api/dispatchMail',sendDispatch,deleteDispatchTicket,sendmail)
}   