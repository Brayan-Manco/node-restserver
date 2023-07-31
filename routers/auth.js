const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateCampos } = require("../middlewares/validate-campos");

const router = Router();

router.post('/login',[
    check('email', 'EL correo es obligatorio').isEmail(),
    check('password', 'la cotraseña es obligatoria').not().isEmpty(),
    validateCampos
], login);



module.exports = router;