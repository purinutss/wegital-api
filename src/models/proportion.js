module.exports = (sequelize, DataTypes) => {
  const Proportion = sequelize.define(
    "Proportion",
    {
      height: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true
        }
      },
      weight: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true
        }
      },
      waist: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true
        }
      },
      date: {
        type: DataTypes.DATE,
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
      onDelete: "RESTRICT"
    });
  };

  return Proportion;
};
