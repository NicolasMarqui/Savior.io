const express = require("express");
const router = express.Router();

//Import Model
const Contas = require("../../models/Contas");
const auth = require("../../middleware/auth");

router.get("/all", auth, (req, res) => {
  Contas.find({ id: req.body.id }).then(user => console.log(user));
});

module.exports = router;
