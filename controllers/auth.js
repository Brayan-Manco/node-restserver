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


const googleSignin = async(req, res = response) => {
    const { id_token } = req.body;
    
    try {
        const { email, name, img } = await googleVerify( id_token );
        let user = await User.findOne({ email });
        if ( !user ) {
            // Tengo que crearlo
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            };
            user = new User( data );
            await user.save();
        }
        // Si el usuario en DB
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }
        // Generar el JWT
        const token = await generarJWT( user.id );
        
        res.json({
            user,
            token
        });
        

    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }
}

module.exports = {
    login,
    googleSignin,
}