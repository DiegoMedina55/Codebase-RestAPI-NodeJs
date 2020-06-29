require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//use => middelwares

// parse application/x-form -urlencoded;
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/user", function (req, res) {
  res.json("Hello World");
});
app.get("/user/:id", function (req, res) {
  res.json("Hello World");
});
app.post("/user", function (req, res) {
  const body = req.body;
  res.json({ body });
});
app.put("/user/:id", function (req, res) {
  const id = req.params.id;
  res.json({ id });
});
app.delete("/user", function (req, res) {
  res.json("Hello World");
});

app.listen(process.env.PORT, () =>
  console.log(`running on port ${process.env.PORT}`)
);
