const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../models");
const createError = require("../utils/create-error");

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      createError("Username or Password is incorrect", 404);
    }

    const isMatchPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isMatchPassword) {
      createError("Username or Password is incorrect", 404);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        telephoneNumber: user.telephoneNumber,
        citizenId: user.citizenId,
        role: user.role,
        username: user.username
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const user = req.body;
    const existUsername = await User.findOne({
      where: { username: user.username }
    });
    if (existUsername) {
      createError("Username has already existed", 400);
    }

    req.body.password = await bcrypt.hash(user.password, 10);

    await User.create(user);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
