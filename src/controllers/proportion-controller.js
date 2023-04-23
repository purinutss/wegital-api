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
