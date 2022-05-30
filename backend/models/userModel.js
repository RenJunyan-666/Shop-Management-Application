import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

//实现用户密码加密
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){ //密码不需要修改，继续创建新用户
        next()
    }

    //密码需要修改，重新加密
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//实现用户密码是否匹配
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password) //解密并匹配密码
}

const User = mongoose.model('User', userSchema)

export default User