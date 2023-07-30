const { Response, Request } = require("express");
const { validationResult } = require("express-validator");

const checkCampos = (req = Request, res = Response, next) => {



    const error = validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json(error)
    }

    next();
}

module.exports = {
    checkCampos,
}