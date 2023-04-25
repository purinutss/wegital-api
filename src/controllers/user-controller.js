const { User, Proportion } = require("../models");
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

exports.deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await User.destroy({
      where: { id: req.params.userId }
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [{ model: Proportion, order: [["createdAt", "DESC"]] }]
    });
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
