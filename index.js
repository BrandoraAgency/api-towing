require("dotenv").config();
const express = require("express");
const { connectDatabase } = require("./db/connect");
const app = express();
const path = require("path");
const pdfLib = require("pdf-lib");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./models");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 3001;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(cookieParser());
app.use(
  session({
    name: "userID",
    secret: `ruaRIGs2JHuXec6N6k58OBDIvD6zL6I2kxEHaIou0oUsDRm5EH6yTdsZZDk7Ghj0V3dO7jHoQKcCwo6gXRXNgUhpbgwOeSg2k8wa`,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
    },
  })
);
require("./api/users/userRoute")(app);
require("./api/towingCompanies/companyRoute")(app);
require("./api/job/jobRoutes")(app);
require("./api/Role/roleRoute")(app);
require("./api/ImgReciepts/ImgRecRoutes")(app);
connectDatabase();

app.get("/api/serve/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "public", imageName);
  res.sendFile(imagePath);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});
db.sequelize.sync().then((req)=>{
app.listen(port, () => {
  console.log(`Example app listening on port ${port} updated code`);
});
})
