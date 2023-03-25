const nodemailer = require("nodemailer");
const fs = require("fs");

let transporter = nodemailer.createTransport({
  host:'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'jerrell.ferry@ethereal.email',
    pass: 'S8PDw3VYgaCcWJfsMv'
  },
  tls: {
    rejectUnauthorized: false,
  },
});
// let transporter = nodemailer.createTransport({
//   host: "mail.ntl.lke.mybluehost.me",
//   port: 465,
//   secure: true, // true for 465, false for other ports 
//   auth: {
//     user: "_mainaccount@ntl.lke.mybluehost.me", // generated ethereal user
//     pass: "Towing@123", // generated ethereal password
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });
function sendmail(req, res) {
  res.status(200).send({ status: "ok" });
}
async function nodeMail(req, res, next) {
  const data = req.body;
  const files = JSON.parse(JSON.stringify(req.files));
  const fileBuffer = Buffer.from(files.sign.data, "base64");
  const idb = Buffer.from(files.idBack.data, "base64");
  const idf = Buffer.from(files.idfront.data, "base64");
  const cardf = Buffer.from(files.cardFront.data, "base64");
  const cardB = Buffer.from(files.cardBack.data, "base64");
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  // send mail with defined transport object
  let mailOptions = {
    from: `Towing Form <allstatetowform@gmail.com>`, // sender address
    to: "allstatetowing001@gmail.com", // list of receivers
    subject: `Towing Job - ${data.firstName + data.lastName} - Ref ID `, // Subject line
    text: `Towing Form`, // plain text req.body
    html: `
    <h3>Reference ID:</h3>
    <p>${data.firstName + data.lastName}</p>
    <hr>
    <h3><strong>Latitude: </strong></h3>
    <p>${data.latitude}</p>
    <hr>
    <h3><strong>Longitude: </strong></h3>
    <p>${data.longitude}</p>
    <hr>
    <h3>Name:</h3>
    <p>${data.firstName + data.lastName}</p>
    <hr>
    <h3><strong>Email: </strong></h3>
    <p>${data.email}</p>
    <hr>
    <h3>Upload Photo ID - Front:</h3>
    <img style="width:200px;" src="cid:idf" />
    <hr>
    <h3>Upload Photo ID - Back:</h3>
    <img style="width:200px;" src="cid:idb" />
    <hr>
    <h3><strong>Type of Service: </strong></h3>
    <p>${data.service}</p>
    <hr>
    <h3><strong>miles: </strong></h3>
    <p>${data.miles}</p>
    <hr>
    <h3><strong>Cardholder Billing Address: </strong></h3>
    <p>${data.billAddress}</p>
    <hr>
    <h3><strong>Cardholder Billing Zip Code: </strong></h3>
    <p>${data.billZip}</p>
    <hr>
    <h3><strong>Payment Total Amount: </strong></h3>
    <p>${data.Amount}</p>
    <hr>
    <h3><strong>Upload Credit / Debit Card Front: </strong></h3>
    <img style="width:200px;" src="cid:cardF" />
    <hr>
    <h3><strong>Upload Credit / Debit Card Back: </strong></h3>
    <img style="width:200px;" src="cid:cardB" />
    <hr>
    <h3><strong>Agree : </strong></h3>
    <p>* I Authorize to charge my credit / debit card for agreed upon service offered. I understand
    this purchase is final. If additional fees are needed for any reason we will request, to
    complete services. I understand ETA's are an estimate and can change. I understand I will
    not be refunded once services are provided. Please be advised that there will be a 50% to
    100% cancellation charge of full amount quoted, included in cancellation fee charge based on
    service(s) requested if I choose to cancel. This is subject to change but will be enforced when
    cancellation is due to but not limited to GOA, changing of service provider, or not needing
    service after a driver has been dispatched, or dispute of ETA time given being extended due
    to matters out of our control.</p>
    <hr>
    <h3><strong>Signature : </strong></h3>
    <img style="width:200px;" src="cid:my-image" />
      `, // html req.body
    attachments: [
      {
        filename: "image.jpg",
        content: fileBuffer,
        encoding: "base64",
        cid: "my-image",
      },
      {
        filename: "image.jpg",
        content: idf,
        encoding: "base64",
        cid: "idf",
      },
      {
        filename: "image.jpg",
        content: idb,
        encoding: "base64",
        cid: "idb",
      },
      {
        filename: "image.jpg",
        content: cardf,
        encoding: "base64",
        cid: "cardF",
      },
      {
        filename: "image.jpg",
        content: cardB,
        encoding: "base64",
        cid: "cardB",
      },
    ],
  };
  console.log('send');
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send({ status: "Not send" });
    }
    next();
  });
}
async function sendDispatch(req,res,next){
  const data = req.body;
  const files = JSON.parse(JSON.stringify(req.files));
  console.log(files);
  let attachments = [];
  try {
    if(Array.isArray(files.files))
    {
      for (let file of files.files) {
        const f = Buffer.from(file.data, "base64"); 
        attachments.push({ 
            filename: file.name,
            content: f,
            encoding: "base64",
          });
      }
    }
    else{
      const f = Buffer.from(files.files.data, "base64"); 
      attachments.push({ 
        filename: files.files.name,
        content: f,
        encoding: "base64",
      });
    }
  } catch (error) {

  }
    // create reusable transporter object using the default SMTP transport
  // send mail with defined transport object
  let mailOptions = {
    from: `Dispatch Form <allstatetowform@gmail.com>`, // sender address
    to: "allstatetowing001@gmail.com", // list of receivers
    subject: `Towing Job - Ticket ID ${data.ticket} `, // Subject line
    text: `Dispatch Form`, // plain text req.body
    html: `
    <h3>Ticket ID:</h3>
    <p>${data.ticket}</p>
    <h3>Job ID:</h3>
    <p>${data.job}</p>
    `, // html req.body
    attachments: attachments
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send({ status: "Not send" });
    }
    else{
      res.status(200)
      next();
    }
  });
}
module.exports = {
  sendmail,
  nodeMail,
  sendDispatch
};
