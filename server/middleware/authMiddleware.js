const jwt = require('jsonwebtoken');

module.exports = function(request, response, next) {
    if(request.method === "OPTIONS"){
        next()
    }
    try{
        let token = request.headers.authorization.split(' ')[1];
        if(!token){
            return response.status(401).json({message: "Не авторизован"}) 
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        request.user= decoded
        next()
    }catch(e){
        response.status(401).json({message: "Не авторизован"}) 
    }
}