const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/user.model");
const { authSchema, authLogin } = require("../helpers/validation_schema");

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already been registered!`);

    const user = new User(result);
    await user.save();

    res.send({ message: "successfully registered" });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await authLogin.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("User not registered");
    const isMatch = await user.isValidPassword(result.password);

    if (!isMatch)
      throw createError.Unauthorized("Username/Password is not valid");

    const id = user.id;
    res.send({ id });
  } catch (error) {
    if (error.isJoi)
      return next(createError.BadRequest("Invalid Username/Password"));
    next(error);
  }
});

router.post("/getDetails", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const userFound = await User.findOne({ _id: userId });
    if (!userFound) {
      throw createError.Unauthorized(`${email} is not registered!`);
    }
    const reqUser = {
      fullName: userFound.fullName,
      phoneNumber: userFound.phoneNumber,
      email: userFound.email,
      state: userFound.state,
      city: userFound.city,
      bloodGroup: userFound.bloodGroup,
    };
    res.send(reqUser);
  } catch (error) {
    next(error);
  }
});

router.post("/checkDonor", async (req, res, next) => {
  try {
    const { userId } = req.body;

    const userFound = await User.findOne({ _id: userId });
    if (userFound.isDonor) {
      res.send({ isDonor: true });
    } else {
      res.send({ isDonor: false });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/feedback", async (req, res, next) => {
  try {
    const { Name, feedback } = req.body;
    const newF = new FeedB({
      Name,
      feedback,
    });
    await newF.save();
    res.send({
      status: 111,
      message: "Thank you for your feedback!🤩 It means a lot.",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
