const { response } = require("express");
const { Categoria } = require("../models");


const obtenerCategorias = async(req, res = response) =>{

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('user', 'name')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        categorias
    });
}

const obtenerCategoria = async(req, res = response) =>{

    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('User', 'name');

    if (!categoria) {
      throw new Error(`El id: ${id} no se necuentra en la base datos`);
    }
    res.json({
        categoria
    })
}


const CrearCategoria = async(req, res = response) =>{

    const name = req.body.name.toUpperCase();

    const categoriaDB = await Categoria.findOne({name});

    if(categoriaDB){
        return res.status(400).json({
            msg: 'Nombre la categoria ya existe'
        })
    }

    //generar la data
    const data ={
        name, 
        user: req.user._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async(req, res = response) =>{

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name  = data.name.toUpperCase();
    data.user = req.user._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json( categoria );

}



const borrarCategoria = async(req, res = response) =>{
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { state: false }, {new: true });

    res.json( categoriaBorrada );
}
module.exports = {
    obtenerCategoria,
    obtenerCategorias,
    CrearCategoria,
    actualizarCategoria,
    borrarCategoria,
}