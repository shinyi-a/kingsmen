// DEPENDENCIES
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

// ROUTES
// get index
router.get("/", (req, res) => {
  res.render("users/new.ejs");
});

// post a new message
// NOTE: as given, this only works if you have sessions working correctly
// if you can't get sessions working correctly, see if you can modify this code so that it works even without sessions!
router.post("/new", async (req, res) => {
  try {
    const createUser = await User.create(req.body);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/new");
});

// EXPORT
module.exports = router;
