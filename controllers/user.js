const { Response, Request } = require("express");

const userGet = (req = Request, res = Response) => {

    const query = req.query;

  res.json({
    msg: "get API - Controlador",
    query
  });
};

const userPost = (req = Request, res = Response) => {

    const {nombre, edad} = req.body;

    res.json({
      msg: "post API - Controlador",
      nombre, 
      edad
    });
  };

  const userPut = (req, res = Response) => {

    const {id} = req.params.id;

    res.json({
      msg: "put API - Controlador",
      id
    });
  };

  const userPatch = (req, res = Response) => {
    res.json({
      msg: "patch API - Controlador",
    });
  };

  const userDelete = (req, res = Response) => {
    res.json({
      msg: "delete API - Controlador",
    });
  };

module.exports = {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete,
};
