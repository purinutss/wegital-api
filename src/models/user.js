module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      telephoneNumber: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          allowNull: false,
          is: /^0[0-9]{9}$/
        }
      },
      citizenId: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          allowNull: false,
          max: 13
        }
      },
      role: {
        type: Datatypes.STRING
      },
      username: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      createdAt: {
        type: Datatypes.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Datatypes.DATE,
        allowNull: true
      }
    },
    {
      underscored: true
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Proportion, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return User;
};
