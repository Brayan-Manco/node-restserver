const { Router } = require("express");

const {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require("../controllers/user");
const { check } = require("express-validator");

const { checkCampos } = require("../middlewares/check_data");

const { isRoleValid, isEmailExist, isIdExist } = require("../helpers/db-Validators");

const router = Router();

router.get('/', userGet);

router.put('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(isIdExist),
  check('role').custom(isRoleValid),
  checkCampos
], userPut);

router.post('/',
  [
    check('name', 'nombre obligatorio').not().isEmpty(),
    check('password', 'obligatorio y mas de tener mas de 6 letras').isLength({
      min: 6,
    }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(isEmailExist),
    check('role').custom(isRoleValid),
    // check('role','No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    checkCampos,
  ],
  userPost
);

router.delete('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(isIdExist),
  checkCampos
], userDelete);

router.patch('/', userPatch);

module.exports = router;
