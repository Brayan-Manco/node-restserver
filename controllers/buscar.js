const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const {User, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'user',
    'categorias',
    'productos',
];


const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const user = await User.findById(termino);
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const user = await User.find({
        //el or es uva condiciones decir un o 
        //aqui se compara si se parece al correo, nombre o email
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: user
    });

}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categorias = await Categoria.find({ name: regex, state: true });

    res.json({
        results: categorias
    });

}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','name');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const productos = await Producto.find({ nombre: regex, estado: true })
                            // .populate('categoria','name')s

    res.json({
        results: productos
    });

}

const buscar = (req, res = response) =>{

    const { coleccion, termino  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'user':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }
}

module.exports = {
    buscar
}