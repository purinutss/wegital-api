const { User } = require("../models");
const bcrypt = require("bcryptjs");

exports.updateUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updateUser = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephoneNumber: req.body.telephoneNumber,
        citizenId: req.body.citizenId,
        username: req.body.username,
        password: req.body.password
      },
      {
        where: {
          id: req.params.userId
        }
      }
    );
    res.status(200).send({ updateUser });
  } catch (err) {
    next(err);
  }
};
