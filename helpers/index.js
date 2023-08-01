const dbValidators = require('./db-validator');
const generateJWT   = require('./generate-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...subirArchivo,
}