const { fileupload } = require("../middleware/Fileupload")
const { AddRec, AddImage, getImages, getRec } = require("./ImgRec")

module.exports=(app)=>{
    app.post('/api/reciepts',fileupload,AddRec)
    app.post('/api/image',fileupload,AddImage)
    app.get('/api/image',getImages)
    app.get('/api/reciepts',getRec)
}