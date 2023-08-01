const { Categoria } = require("../models");
const Producto  = require("../models/producto");
const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = '') => {
    //consulta a rol si existe
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error("rol no encontrado en la base de datos");
  }
};

const isEmailExist = async (email = '') => {
  //verdifcar si el correo existe
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El correo: ${email} ya esta en uso`);
  }
};

const isIdExist = async (id) => {
    //verdifcar si el correo existe
    const existId = await User.findById(id);
    if (!existId) {
      throw new Error(`El id: ${id} no se necuentra en la base datos`);
    }
  };

  const isIdCategoriaExist = async (id) => {
    //verdifcar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
  };

  const isIdProductoExist = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

  const incluida = colecciones.includes( coleccion );
  if ( !incluida ) {
      throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
  }
  return true;
}

  

module.exports = {
  isRoleValid,
  isEmailExist,
  isIdExist,
  isIdCategoriaExist,
  isIdProductoExist,
  coleccionesPermitidas
};
