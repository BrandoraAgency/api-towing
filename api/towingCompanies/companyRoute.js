const { AddCompany, UpdateCompany, GetCompany } = require("./company")

module.exports=(app)=>{
    app.get('/company',GetCompany);
    app.post('/company',AddCompany);
    app.put('/company',UpdateCompany);
}