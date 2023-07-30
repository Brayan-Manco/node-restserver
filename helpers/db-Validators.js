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

module.exports = {
  isRoleValid,
  isEmailExist,
  isIdExist,
};
