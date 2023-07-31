const { response } = require("express")


const isAdminRole = ( req, res = response, next)=> {

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validor el token primero'
        });
    }

    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${role} No estas autorizado para realizar esta petición`
        });
    }

    next()
}

const validateRoles = ( ...roles ) =>{


    return (req, res = response, next) =>{

        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin validor el token primero'
            });
        }

        if(!roles.includes( req.user.role)){
            return res.status(401).json({
                msg: 'El servicio requiere un rol'
            })
        }
    
        next();
    }
}

module.exports = {
    isAdminRole,
    validateRoles,
}