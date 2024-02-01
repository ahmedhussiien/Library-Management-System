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
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: 'user',
      underscored: true,
      timestamps: true, // adds the `createdAt` and `updatedAt` attributes
    },
  );

  User.associate = (models) => {
    models.User.hasMany(models.BookLoan, {
      foreignKey: 'userId',
      targetId: 'id',
    });
  };

  return User;
}

export default createUserModel;
