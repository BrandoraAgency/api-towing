const { AddCompany, UpdateCompany, GetCompany, checkCompany, addrating, GetSingleCompany, updateCompanyDetails } = require("./company")

module.exports=(app)=>{
    app.get('/api/company',GetCompany);
    app.get('/api/singlecompany',GetSingleCompany);
    app.post('/api/company',checkCompany,AddCompany);
    app.put('/api/company',checkCompany,UpdateCompany);
    app.put('/api/singlecompany',updateCompanyDetails);
    app.post('/api/rating',addrating);
}