const express = require('express');
const { connectDatabase } = require('./db/connect');
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const session = require('express-session');
const db = require('./models');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var corsOptions = {
  origin: 'http://localhost:5173',
  methods: ["GET","POST","PUT"],
  credentials:true
}
app.use(cors(corsOptions))
app.use(fileUpload());
app.use(cookieParser());
app.use(session({
  name:'userID',
  secret:"changeme",
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000
  },
}))
require('./api/users/userRoute')(app)
require('./api/towingCompanies/companyRoute')(app)
require('./api/job/jobRoutes')(app)
require('./api/Role/roleRoute')(app)
connectDatabase()
app.get('/api', (req, res) => {
  res.json({message:'Hello World!'})
})
// db.sequelize.sync().then((req)=>{
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
// })