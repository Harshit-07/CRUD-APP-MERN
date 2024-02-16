const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router = express.Router();

//Add new users (POST)
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(200).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//Fetch all users Request (GET)
router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//Fetch single user by id (GET)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//Delete user by id (DELETE)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteSingleUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteSingleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//Edit user details (PUT/PATCH)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  try {
    const updateSingleUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateSingleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
