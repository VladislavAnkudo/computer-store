const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) =>{
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY, 
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(request, response){
        const {email, password, role} = request.body;
        if(!email || !password){
            return next(ApiError.badRequest('Проверьте правильность ввода почты или пароля'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с такой почтой уже существует'))
        }
        const hashPassowrd = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassowrd})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return response.json({token})
    }
    async login(request, response, next){
        const {email, password} = request.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassowrd = bcrypt.compareSync(password, user.password)
        if(!comparePassowrd){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return response.json({token})
    }
    async check(request, response, next){
        const token = generateJwt(request.user.id, request.user.email, request.user.role)
        response.json({token})
    }
}
module.exports = new UserController()