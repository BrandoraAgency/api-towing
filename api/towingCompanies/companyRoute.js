const { AddCompany, UpdateCompany, GetCompany } = require("./company")

module.exports=(app)=>{
    app.get('/api/company',GetCompany);
    app.post('/api/company',AddCompany);
    app.put('/api/company',UpdateCompany);
}