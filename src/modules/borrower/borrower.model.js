/**
 * Model class for "Borrower"
 * @param {Sequelize} sequelize - sequelize object
 * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
 *
 * @returns Borrower - sequelize model for the borrower entity
 */
function createBorrowerModel(sequelize, DataTypes) {
  const Borrower = sequelize.define(
    'Borrower',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        validate: {
          notNull: true,
          isInt: true,
        },
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
          len: [11, 11],
        },
      },
    },
    {
      tableName: 'borrower',
      underscored: true,
      timestamps: false,
    },
  );

  Borrower.associate = (models) => {
    models.Borrower.belongsTo(models.User);

    models.Borrower.hasMany(models.BookLoan, {
      foreignKey: 'borrowerId',
      targetId: 'id',
    });
  };

  return Borrower;
}

export default createBorrowerModel;
