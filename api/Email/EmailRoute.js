const { nodeMail, sendmail } = require("./Email")
const multer = require('multer');
// configure multer to handle file uploads
const upload = multer({ dest: 'temp/' });

module.exports=(app)=>{
    app.post('/api/email' ,nodeMail,sendmail)
}   