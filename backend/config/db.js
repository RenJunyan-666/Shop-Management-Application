import mongoose from "mongoose";

//链接数据库
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology:true,
            useNewUrlParser:true
        })

        console.log(`MongoDB is connected by ${conn.connection.host}`.cyan.underline)
    }catch(err){
        console.log(`Error: ${err.message}`.red.underline.bold)
        process.exit(1) //退出
    }
}

export default connectDB