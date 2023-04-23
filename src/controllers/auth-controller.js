const jwt = require("jsonwebtoken");

const { User } = require("../models");
const createError = require("../utils/create-error");

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      createError("Username or Password is incorrect", 404);
    }

    const isMatchPassword = req.body.password === user.password;

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
