let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let user = require("../models/user");
let store = require("../models/store");

router.route("/create").post((req, res, next) => {
  user.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/login").get((req, res) => {
  console.log(req.params);
  user.findOne(req.params.username).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      (user.password === req.params.password).then((isMatch) => {
        if (isMatch) {
          res.json(data);
        }
      });
    }
  });
});

router.route("/edit/:id").get((req, res) => {
  user.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/update/:id").put((req, res, next) => {
  user.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("User updated successfully !");
      }
    }
  );
});

router.route("/delete/:id").delete((req, res, next) => {
  user.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

//
router.route("/add").post((req, res, next) => {
  console.log("err", req);

  store.create(req.body, (error, data) => {
    if (error) {
      console.log("err", error);
      return next(error);
    } else {
      console.log("err", data);
      res.json(data);
    }
  });
});

router.route("/get-store").get((req, res) => {
  store.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/update-store").put((req, res, next) => {
  var obj = db.store.findOne({ category: req.body.category });
  console.log(obj);
  store.findByIdAndUpdate(
    obj._id,
    { $set: { items: updatedItems } },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("User updated successfully !");
      }
    }
  );
});
module.exports = router;
