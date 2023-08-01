const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre el requerdido'],
    },
    email: {
        type: String,
        required: [true, 'El correo el requerdido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña el requerdido'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'El rol el requerdido'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    } 

});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('User', UsuarioSchema);