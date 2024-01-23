const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

const app = express();

const assignEnvVarsToNode = require('./utils');

assignEnvVarsToNode();

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

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, (_) => console.log("listening to 3000"));