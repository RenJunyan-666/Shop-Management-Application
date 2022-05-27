import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false //初始用户都是非管理员
    }
}, {
    timestamps:true //有创建和更新时间
})

const User = mongoose.model('User', userSchema)

export default User