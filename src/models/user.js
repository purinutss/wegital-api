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
          is: /^0[0-9]{9}$/
        }
      },
      citizenId: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[0-9]{13}$/,
          notEmpty: true
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
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };

  return User;
};
