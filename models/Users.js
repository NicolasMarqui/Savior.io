const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarios = new Schema({
    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    senha: {
        type: String,
        required: true
    },

    quantidadeDinheiro: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('UsuariosCarteira', usuarios);