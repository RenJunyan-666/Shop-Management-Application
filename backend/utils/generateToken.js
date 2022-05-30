import jwt from 'jsonwebtoken'

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d' //有效期30天
    })
}

export default generateToken

/**
 * JWT: JSON Web 令牌
 * 标头：令牌类型(JWT)和所使用的签名算法
 * 有效载荷：包含声明(有关实体和其他数据的声明)
 * 签名
 */