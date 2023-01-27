const { getRoles, CreateRoles } = require("./Role")

module.exports=(app)=>{
    app.get('/api/roles',getRoles)
    app.post('/api/roles',CreateRoles)
    // app.put('/api/roles',)
    // app.delete('/roles',)
}