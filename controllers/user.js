const { Response, Request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const userGet = async (req = Request, res = Response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { state: true };


  // //trarer todos los datos con la consulta query
  // const users = await User.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limit));
  // //conatr cunatos datos hay ne la base de datos 
  // const total = await User.countDocuments(query);

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(desde))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const userPost = async (req = Request, res = Response) => {
  const { name, email, password, role } = req.body;
  const user = User({ name, email, password, role });

  //encripar  la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json(user);
};

const userPut = async (req, res = Response) => {
  const { id } = req.params;
  const { _id, password, google, eamil, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.json(user);
};

const userPatch = async (req, res = Response) => {
  res.json({
    msg: "patch API - Controlador",
  });
};

const userDelete = async (req, res = Response) => {

  const { id } = req.params;

  //eliminar fisicamente
  // const user = await User.findByIdAndDelete( id );

  const user = await User.findByIdAndUpdate( id, {state: false})
  const userAutenticado = req.user;

  res.json({
    user,
    // userAutenticado
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete,
};
