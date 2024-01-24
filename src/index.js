const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

const app = express();

const assignEnvVarsToNode = require("./utils");
assignEnvVarsToNode();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 5000000 }));
// caso tenha usuario e senha em localhost definir user@password
const opts = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(process.env.DATABASE_URL, opts);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

requireDir("./models");


app.use("/api", require("./routes"));


app.listen(3000, (_) => console.log("listening to 3000"));
