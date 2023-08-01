const {Router} = require('express');
const { CrearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categoria');
const { validateJWT,validateCampos, isAdminRole } = require('../middlewares');
const { check } = require('express-validator');
const { isIdCategoriaExist } = require('../helpers/db-Validators');
const router = Router();


router.get('/',  obtenerCategorias);

router.get('/:id', [
    check('id', 'Id incorrecto').isMongoId(),
    check('id').custom(isIdCategoriaExist),
    validateCampos,
],  obtenerCategoria);

router.post('/',[
    validateJWT,
    check('name', 'Nombre requerido').not().isEmpty(),
    validateCampos,
], CrearCategoria );

router.put('/:id',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( isIdCategoriaExist ),
],  actualizarCategoria);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( isIdCategoriaExist ),
    validateCampos,
],  borrarCategoria);


module.exports = router;