const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { TowReceipt, TowImage } = require("../../models/Role")(
  sequelize,
  DataTypes
);

const getImages =async(req,res)=>{
  const id=req.query.id;
  try {
    const images = await TowImage.findAll({ where: { jobId: id } });
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({
      message:"not found"
    })
  }
}
const getRec =async(req,res)=>{
  const id=req.query.id;
  try {
    const images = await TowReceipt.findAll({ where: { jobId: id } });
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({
      message:"not found"
    })
  }
}

const AddImage = async (req, res) => {
  const id = req.query.id;

  try {
    const path = req.filePath;
    const image = await TowImage.create({
      src: path,
      jobId: id,
    });
    res.status(200).json({
      message: "Image Added",
      imageID: image.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Image Not Added",
    });
  }
};

const AddRec = async (req, res) => {
  const id = req.query.id;
  const path = req.filePath;
  try {
    const image = await TowReceipt.create({
      src: path,
      jobId: id,
    });
    res.status(200).json({
      message: "Image Added",
      imageID: image.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Image Not Added",
    });
  }
};

module.exports = {
  AddImage,
  AddRec,
  getImages,
  getRec
};
