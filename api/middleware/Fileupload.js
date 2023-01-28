const fileupload = (req, res, next) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.file;

  //  mv() method places the file inside public directory
  myFile.mv(`./public/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    req.filePath = `${myFile.name}`;
    // return res.send({name: myFile.name, path: `/${myFile.name}`});
    next();
  });
};
module.exports = {
  fileupload,
};
