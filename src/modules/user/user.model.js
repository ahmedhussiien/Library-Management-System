import { userRoles } from './user.enum.js';

/**
 * Model class for "User"
 * @param {Sequelize} sequelize - sequelize object
 * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
 *
 * @returns User - sequelize model for user entity
 */
function createUserModel(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [8, 64] },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      role: {
        type: DataTypes.ENUM(...Object.values(userRoles)),
        allowNull: false,
        validate: {
          isIn: [Object.values(userRoles)],
        },
      },
    },
    {
      tableName: 'user',
      underscored: true,
      timestamps: true, // adds the `createdAt` and `updatedAt` attributes,
      defaultScope: {
        attributes: {
          exclude: ['password'], // exclude password by default.
        },
        order: [['id', 'DESC']],
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    },
  );

  User.associate = (models) => {
    models.User.hasOne(models.Borrower);
  };

  return User;
}

export default createUserModel;
