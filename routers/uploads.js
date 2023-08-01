const { Router } = require("express");
const { check } = require("express-validator");

const { validateCampos, validarArchivoSubir } = require("../middlewares");
const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers/db-Validators");

const router = Router();

router.post("/", validarArchivoSubir, cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["user", "productos"])
    ),
    validateCampos,
  ],
  actualizarImagenCloudinary
);
// ], actualizarImagen);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["user", "productos"])
    ),
    validateCampos,
  ],
  mostrarImagen
);

module.exports = router;
