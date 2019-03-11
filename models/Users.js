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
    },

    quantidadeDinheiroFinal: {
        type: Number,
        default: 0
    },

    data_Registro: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('UsuariosCarteira', usuarios);