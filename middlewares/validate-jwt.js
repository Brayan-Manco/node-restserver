const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async( req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'Error al obtener el token',
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        
        //leer el usurario por el uid
        const user = await User.findById(uid);

        if(!user) {
            return res.status(401).json({
                mgs: 'El usuario ha sido eliminado'
            })
        }
        
        //verificar si el uid esta eliminado
        if(!user.state) {
            return res.status(401).json({
                mgs: 'Token invalido'
            })
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }
    // console.log(token);

    // next();
}

module.exports = {
    validateJWT,
}