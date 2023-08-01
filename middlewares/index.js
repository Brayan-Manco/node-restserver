const validaCampos = require("./validate-campos");
const validaJWT = require("../middlewares/validate-jwt");
const validaRoles = require("../middlewares/validate-role");
const validarArchivoSubir = require('../middlewares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivoSubir,
}