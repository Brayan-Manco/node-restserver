const { Request, Response } = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async ( req = Request, res = Response ) =>{
    const { email, password} = req.body;

    try {

        //verificar si email existe 
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'Usuario incorrectos',
            })
        }
        //si el usuario esta inactivo
        if(!user.state){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos',
            })
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'Contrasena Incorrecta'
            })
        }
        //generar el JWT
        const token = await generateJWT( user.id )

        res.json({
           user,
           token 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador',
        });
    }
}

module.exports = {
    login,
}