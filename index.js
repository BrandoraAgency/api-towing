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
const { fs } = require("fs");
const port = process.env.PORT || 3001;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var corsOptions = {
  origin: "http://www.ntl.lke.mybluehost.me",
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

app.post("/api/modify-pdf", async (req, res) => {
  console.log('done');
  try {
    // Get the PDF file and modifications from the request
    const pdfFile = req.files.pdfFile;
    const modifications = req.body;

    // Open the PDF
    const pdfDoc = await pdfLib.PDFDocument.load(pdfFile.data);

    // Make the desired modifications to the PDF (e.g. add text, remove pages, etc.)
    // Code for modifications

    // Generate the new PDF
    const pdfBytes = await pdfDoc.save();

    // Send the modified PDF back to the client as a download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=modified.pdf");
    res.send(pdfBytes);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.get("/api/serve/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "public", imageName);
  res.sendFile(imagePath);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port} updated code`);
});
