const express = require('express');
const router = express.Router();

//Import Model
const Users = require('../../models/Users');
const Contas = require('../../models/Contas');

router.get('/hello', (req, res) => {
    res.send('Hello from /hello')
})

module.exports = router;