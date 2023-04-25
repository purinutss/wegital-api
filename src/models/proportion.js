module.exports = (sequelize, DataTypes) => {
  const Proportion = sequelize.define(
    "Proportion",
    {
      height: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true
        }
      },
      weight: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true
        }
      },
      waist: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true
        }
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.NOW
      }
    },
    {
      underscored: true
    }
  );

  Proportion.associate = (models) => {
    Proportion.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };

  return Proportion;
};
