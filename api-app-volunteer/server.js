const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
require('dotenv').config();


const userRoute = require('./routes/user.routes');
const softRouter = require('./routes/soft.routes');

const authenticateToken = require('./middleware/authToken');

/*const password_MongoDB = process.env.PASSWORD_MONGODB;
const uri = "mongodb+srv://"+password_MongoDB+"@cluster0.ob2ppqx.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log('Error during the connexion :', err));
    }
    catch (error) {
        console.log(error);
    }
}
connect();*/

const app = express();

const originURL = "http://localhost:3000";
const originURL2 = "https://marmitise.netlify.app";

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: originURL }));



//////////////////////// PERMET DE SECURISE L'UTILISATION DE L'API UNIQUEMENT AU SITE
// Définissez la liste des origines autorisées
const allowedOrigins = [originURL];

// Configurez CORS avec une fonction personnalisée pour vérifier l'origine de la requête
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // Si l'origine de la requête n'est pas autorisée, renvoyez une erreur ou une réponse appropriée
    return res.status(403).json({ error: "Access denied" });
  }
  next();
});


app.use('/api/user', userRoute);
//app.use('/api/soft', authenticateToken, softRouter);


app.get("/", (req, res) => {
    res.send("welcome to the beginning of my project");
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server started on port 8000");
})