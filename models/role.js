const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        require: [true, 'El rol no es valido']
    }
});

module.exports = model('Role', RoleSchema);
