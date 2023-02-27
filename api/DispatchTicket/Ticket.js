const { DataTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { DispatchTicket,Job } = require("../../models/Role")(sequelize, DataTypes);
const { v4: uuidv4 } = require('uuid');

const createTicket = async (req, res) => {
  try {
    const { jobId } = req.body;
    const ticketNumber = uuidv4();
    const dispatchTicket = await DispatchTicket.create({
      ticketNumber,
      jobId,
    });
    res.status(201).json({ ticketNumber });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
async function getDispatchTicketWithJob(req,res) {
  const id=req.query.ticketNumber;
  try {
    const dispatchTicket = await DispatchTicket.findOne({
      where: { ticketNumber: id },
      include: {
        model: Job,
        attributes: ["id", "year", "color", "vinNo", "make", "model"], // replace with the actual job attributes you want to retrieve
      },
    });
    if(dispatchTicket) return res.status(200).json(dispatchTicket)
    return res.status(400).json('Not Send')
} catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
async function deleteDispatchTicket(req,res,next) {
    try {
      const dispatchTicket = await DispatchTicket.findByPk(req.body.id);
      await dispatchTicket.destroy();
      next()
    } catch (error) {
      res.status(400).json({
        message:'Ticket Not Deleted'
      })
    }
  }
module.exports = {
  createTicket,
  getDispatchTicketWithJob,
  deleteDispatchTicket,
};
