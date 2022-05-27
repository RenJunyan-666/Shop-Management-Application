import bcrypt from 'bcryptjs'

const users = [
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456', 10), //加密密码
        isAdmin:true
    },
    {
        name:'Summer',
        email:'summer@example.com',
        password:bcrypt.hashSync('123456', 10), //加密密码
        isAdmin:true
    },
    {
        name:'Winter',
        email:'winter@example.com',
        password:bcrypt.hashSync('123456', 10), //加密密码
        isAdmin:true
    }
]

export default users