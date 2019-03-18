const express = require("express");
const route = express.Router();

//Import Model
const Contas = require("../../models/Contas");
const auth = require("../../middleware/auth");
const Users = require('./../../models/Users');

route.post('/add', (req, res) => {
  const { idPessoa, valorDinheiro, operacao, descricao, horaPost , titulo} = req.body;


  const newEntry = new Contas({
    idPessoa,
    valorDinheiro,
    operacao,
    titulo,
    descricao,
    horaPost
  })

  newEntry.save()
      .then(entry => res.status(200).json(entry))
      .catch(err => console.log(err))
})

route.put('/edit', (req, res) => {
  const id = req.query.id;
  const op = req.query.op;
  const valor = req.query.valor;

  let total = 0;

  Users.find({ _id: id}, (err, user) => {
    if(err) throw err;

    user.map(el => {
      if(op == 'credito'){
        total = +el.quantidadeDinheiro + +valor;
        console.log(total);
      }else{
        total = +el.quantidadeDinheiro - +valor;
      }
  
      Users.findOneAndUpdate({ _id: id }, {$set:{quantidadeDinheiro: total}}, {new: true}, (err,doc) =>{
        if(err) throw err
  
        res.json(doc)
  
      })
    })

  })
})

route.get('/user/:id', (req,res) => {

  const id = req.params.id;

  Users.findById({ _id: id }, (err, user) => {
    if(err) throw err;

    res.json(user);
  })

})

route.get('/all/:id', (req,res) => {

  const id = req.params.id;

  Contas.find({ idPessoa: id }).sort({ horaPost: -1 }).exec((err, user) => {
    if(err) throw err;

    res.json(user)
  })

})

route.get('/despesa', (req, res) => {
  const id = req.query.id
  console.log(req.query.id)

  Contas.findOne({ _id: id }).sort({ horaPost: -1 }).exec((err, conta) => {
    if(err) throw err;

    res.json(conta)
  })
 
})

module.exports = route;
