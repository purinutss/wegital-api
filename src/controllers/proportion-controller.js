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
    const userProportion = await Proportion.findAll({
      where: {
        userId: req.user.id
      },
      order: [["date", "DESC"]]
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

exports.deleteProportion = async (req, res, next) => {
  try {
    await Proportion.destroy({
      where: {
        id: req.params.proportionId,
        userId: req.user.id
      }
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
exports.updateProportion = async (req, res, next) => {
  try {
    const updateProportion = await Proportion.update(
      {
        height: req.body.height,
        weight: req.body.weight,
        waist: req.body.waist,
        date: req.body.date
      },
      { where: { id: req.params.proportionId } }
    );
    res.status(200).send({ updateProportion });
  } catch (err) {
    next(err);
  }
};
