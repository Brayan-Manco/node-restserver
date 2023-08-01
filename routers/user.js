const { Router } = require("express");

const {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require("../controllers/user");
const { check } = require("express-validator");

// const { validateCampos } = require("../middlewares/validate-campos");
// const { validateJWT } = require("../middlewares/validate-jwt");
// const { isAdminRole, validateRoles } = require("../middlewares/validate-role");

const { 
  validateJWT, 
  validateRoles, 
  validateCampos,
  isAdminRole
} = require("../middlewares");

const {
  isRoleValid,
  isEmailExist,
  isIdExist,
} = require("../helpers/db-Validators");

const router = Router();

router.get("/", userGet);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(isIdExist),
    check("role").custom(isRoleValid),
    validateCampos,
  ],
  userPut
);

router.post("/",
  [
    check("name", "nombre obligatorio").not().isEmpty(),
    check("password", "obligatorio y mas de tener mas de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(isEmailExist),
    check("role").custom(isRoleValid),
    // check('role','No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateCampos,
  ],
  userPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateRoles("ADMIN_ROLE", "USER_ROLE"),
    isAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(isIdExist),
    validateCampos,
  ],
  userDelete
);

router.patch("/", userPatch);

module.exports = router;
