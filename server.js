//Requires
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

//Or PORT variable or 5000
const port = process.env.PORT || 5000;

//Routes
const wallet = require('./Routes/api/Wallet');
app.use('/api/money/', wallet);

//Database
const db = require('./config/keys').MONGO_URI;

//MiddleWares
app.use(cors());
app.use(bodyParser.json());

//Remove Deprecation Warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Database Connection
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(console.log('Banco de dados conectado com sucesso'))
    .catch(err => console.log(err));

//Listen
app.listen(port , () => console.log(`Server rodando na porta ${port}`));