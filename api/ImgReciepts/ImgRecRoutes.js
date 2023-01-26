const { fileupload } = require("../middleware/Fileupload")
const { AddRec, AddImage } = require("./ImgRec")

module.exports=(app)=>{
    app.post('/reciepts',fileupload,AddRec)
    app.post('/image',fileupload,AddImage)
}