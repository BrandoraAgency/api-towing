const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { TowReceipt, TowImage } = require("../../models/Role")(
  sequelize,
  DataTypes
);

const AddImage = async (req, res) => {
  const ImageBody = req.body;
  try {
    const image = await TowImage.create(ImageBody);
    res.status(200).json({
      message: "Image Added",
      imageID: image.id,
    });
  } catch (error) {
    res.status(400).json({
      message: "Image Not Added",
    });
  }
};

const AddRec = async (req, res) => {
    const ImageBody = req.body;
    try {
      const image = await TowReceipt.create(ImageBody);
      res.status(200).json({
        message: "Image Added",
        imageID: image.id,
      });
    } catch (error) {
      res.status(400).json({
        message: "Image Not Added",
      });
    }
};

module.exports = {
  AddImage,
  AddRec
};
