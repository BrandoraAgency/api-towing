const { getRoles, CreateRoles } = require("./Role")

module.exports=(app)=>{
    app.get('/roles',getRoles)
    app.post('/roles',CreateRoles)
    // app.put('/roles',)
    // app.delete('/roles',)
}