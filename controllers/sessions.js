// DEPENDENCIES
const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const User = require("../models/users");
const bcrypt = require("bcrypt");

// ROUTES
// get index
// router.get("/", (req, res) => {
//   res.render("users/new.ejs");
// });

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// post a new message
// NOTE: as given, this only works if you have sessions working correctly
// if you can't get sessions working correctly, see if you can modify this code so that it works even without sessions!
router.post("/", async (req, res) => {
  const createSession = await User.findOne({ username: req.body.username });
  if (createSession) {
    console.log(req.body.password);
    console.log(createSession.password);
    console.log(createSession);
    const vaildUser = await bcrypt.compare(
      req.body.password,
      createSession.password
    );
    if (vaildUser) {
      req.session.currentUser = createSession;
      res.redirect("/");
    } else {
      res.send("wrong password");
      console.log("wrong password");
    }
  } else {
    res.send("no users found");
    console.log("no users found");
    res.redirect("/sessions/new");
  }
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// EXPORT
module.exports = router;
