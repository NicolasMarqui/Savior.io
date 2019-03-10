const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contas = new Schema({
    idPessoa: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    
    valorDinheiro: {
        type: Number,
        required: true
    },

    operacao: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
    },

    horaPost: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Operacao', contas);