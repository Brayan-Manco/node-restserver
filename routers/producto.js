const Router = require('express');
const { obtenerProducto, obtenerProductos, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/producto');
const { check } = require('express-validator');
const { isIdProductoExist, isIdCategoriaExist } = require('../helpers/db-Validators');
const { validateCampos, validateJWT, isAdminRole } = require('../middlewares');
const router = Router();

router.get('/' ,obtenerProductos);

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( isIdProductoExist ),
    validateCampos,
],obtenerProducto);

router.post('/',[ 
    validateJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( isIdCategoriaExist ),
    validateCampos
],crearProducto);

router.put('/:id',[
    validateJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( isIdProductoExist ),
    validateCampos
],actualizarProducto);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( isIdProductoExist ),
    validateCampos,
],borrarProducto);



module.exports = router;