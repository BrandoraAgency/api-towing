const { fileupload } = require("../middleware/Fileupload")
const { AddRec, AddImage } = require("./ImgRec")

module.exports=(app)=>{
    app.post('/api/reciepts',fileupload,AddRec)
    app.post('/api/image',fileupload,AddImage)
}