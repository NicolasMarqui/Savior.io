const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("../../models/Users");
const secret = require("../../config/keys").jwtSecret;
const auth = require("../../middleware/auth");

route.post("/register", (req, res) => {
  const { nome, email, senha, quantidadeDinheiro } = req.body;

  if (!nome || !email || !senha || !quantidadeDinheiro)
    return res
      .status(400)
      .json({ msg: "Todos os campos devem ser preenchidos" });

  Users.findOne({ email }).then(user => {
    if (user)
      return res.status(400).json({ msg: "Esse email já está cadastrado" });

    const newUser = new Users({
      nome,
      email,
      senha,
      quantidadeDinheiro
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.senha, salt, (err, hash) => {
        if (err) throw err;

        newUser.senha = hash;

        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            secret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  nome: user.nome,
                  email: user.email,
                  quantidadeDinheiro: user.quantidadeDinheiro
                }
              });
            }
          );
        });
      });
    });
  });
});

route.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha)
    return res
      .status(400)
      .json({ msg: "Todos os campos devem ser preenchidos" });

  Users.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "Usuário não cadastrado" });

    bcrypt.compare(senha, user.senha).then(isValid => {
      if (!isValid)
        return res.status(400).json({ msg: "Email/ Senha Inválida" });

      jwt.sign({ id: user.id }, secret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;

        res.json({
          token,
          user: {
            id: user.id,
            nome: user.nome,
            email: user.email
          }
        });

        console.log(user)

      });
    });
  });
});

route.get("/data", auth, (req, res) => {
  Users.findById(req.user.id)
    .select("-senha")
    .then(user => res.json(user));
});



module.exports = route;
