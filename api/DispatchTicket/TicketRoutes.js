const { createTicket,getDispatchTicketWithJob } = require("./Ticket")

module.exports=(app)=>{
    app.post('/api/ticket' ,createTicket)
    app.get('/api/ticket' ,getDispatchTicketWithJob)
}