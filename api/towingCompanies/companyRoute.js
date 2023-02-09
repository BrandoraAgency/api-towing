const { AddCompany, UpdateCompany, GetCompany, checkCompany, addrating } = require("./company")

module.exports=(app)=>{
    app.get('/api/company',GetCompany);
    app.post('/api/company',checkCompany,AddCompany);
    app.put('/api/company',checkCompany,UpdateCompany);
    app.post('/api/rating',addrating);
}