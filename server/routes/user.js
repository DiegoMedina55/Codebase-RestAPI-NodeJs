const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const UserModel = require("../models/user");

const app = express();

app.get("/user", function (req, res) {
  const page = Number(req.query.page || 0);
  const amount = Number(req.query.amount || 5);

  UserModel.find({ state: true })
    .skip(page * amount)
    .limit(amount)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          error: err,
        });
      }
      UserModel.count({ state: true }, (err, count) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            error: err,
          });
        }
        res.json({
          ok: true,
          totalUsers: count,
          users,
        });
      });
    });
});

app.get("/user/:id", function (req, res) {
  const id = req.params.id;
  UserModel.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        error: err,
      });
    }
    res.json({
      ok: true,
      user,
    });
  });
});

app.post("/user", function (req, res) {
  const body = req.body;
  const user = new UserModel({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        error: err,
      });
    }

    res.json({
      ok: true,
      user: userDB,
    });
  });
});

app.put("/user/:id", function (req, res) {
  const id = req.params.id;
  const body = _.pick(req.body, ["name", "email", "img", "role", "state"]);

  UserModel.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          error: err,
        });
      }

      res.json({
        ok: true,
        user: userDB,
      });
    }
  );
});

app.delete("/user/:id", function (req, res) {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id, { state: false }, (err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        error: err,
      });
    }
    if (deletedUser === null) {
      return res.status(400).json({
        ok: false,
        error: {
          message: `Error. No user with ID ${id}`,
        },
      });
    }
    res.json({
      ok: true,
      user: deletedUser,
    });
  });
});

// app.delete("/user/:id", function (req, res) {
//   const id = req.params.id;
//   UserModel.findByIdAndRemove(id, (err, deletedUser) => {
//     if (err) {
//       return res.status(400).json({
//         ok: false,
//         error: err,
//       });
//     }
//     if (deletedUser === null) {
//       return res.status(400).json({
//         ok: false,
//         error: {
//           message: `Error. No user with ID ${id}`,
//         },
//       });
//     }
//     res.json({
//       ok: true,
//       user: deletedUser,
//     });
//   });
// });

module.exports = app;
