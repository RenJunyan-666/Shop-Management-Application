import express from "express";
import multer from 'multer'
import path from 'path'

const router = express.Router()

//创建磁盘存储引擎
const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, 'uploads/')
    },
    filename(req, file, callback){
        callback(null, `${file.filename} - ${Date.now()}${path.extname(file.originalname)}`)
    }
})

//验证文件类型
const checkFileType = (file, callback)=>{
    //定义允许的文件类型
    const fileTypes = /jpg|jpeg|png/
    //判断文件扩展名
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    //验证资源的媒体类型
    const mimetype = fileTypes.test(file.mimetype)
    if(mimetype && extname){
        return callback(null, true)
    }else{
        callback(new Error('only for file format'))
    }
}

//实现上传
const upload = multer({
    storage, 
    fileFilter: function(req, file, callback){
        checkFileType(file, callback)
    }
})

//创建文件上传路由
router.post('/', upload.single('image'), (req,res)=>{
    res.send(`/${req.file.path}`)
})

export default router