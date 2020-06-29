require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//use => middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./routes/user"));

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err, resp) => {
    if (err) throw err;
    console.log("Database Online!");
  }
);

app.listen(process.env.PORT, () =>
  console.log(`running on port ${process.env.PORT}`)
);
