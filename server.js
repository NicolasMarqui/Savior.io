//Requires
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//MiddleWares
app.use(cors());
app.use(express.json());

//Or PORT variable or 5000
const port = process.env.PORT || 5000;

//Routes
app.use("/api/money/", require("./Routes/api/Wallet"));
app.use("/api/user/", require("./Routes/api/User"));

//Database
const db = require("./config/keys").MONGO_URI;

//Remove Deprecation Warnings
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//Database Connection
mongoose
  .connect(db, { useNewUrlParser: true }) 
  .then(console.log("Banco de dados conectado com sucesso"))
  .catch(err => console.log(err));
 
//Listen
app.listen(port, () => console.log(`Server rodando na porta ${port}`));
