const { Proportion, User } = require("../models");

exports.createProportion = async (req, res, next) => {
  try {
    const createProportion = await Proportion.create({
      height: req.body.height,
      weight: req.body.weight,
      waist: req.body.waist,
      date: req.body.date,
      userId: req.user.id
    });

    res.status(201).json({ createProportion });
  } catch (err) {
    next(err);
  }
};

exports.getProportionByUserId = async (req, res, next) => {
  try {
    const userProportion = await Proportion.findOne({
      where: {
        id: req.user.id
      }
    });
    res.status(200).json({ userProportion });
  } catch (err) {
    next(err);
  }
};

exports.getAllProportion = async (req, res, next) => {
  try {
    const proportions = await Proportion.findAll();
    res.status(200).json({ proportions });
  } catch (err) {
    next(err);
  }
};
