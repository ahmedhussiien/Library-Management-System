/**
 * Model class for "BookLoan"
 * @param {Sequelize} sequelize - sequelize object
 * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
 *
 * @returns BookLoan - sequelize model for the book loan entity
 */
function createBookLoanModel(sequelize, DataTypes) {
  const BookLoan = sequelize.define(
    'BookLoan',
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
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'book',
          key: 'id',
        },
        validate: {
          notNull: true,
          isInt: true,
        },
      },
      checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          notNull: true,
        },
      },
      checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          notNull: true,
        },
      },
    },
    {
      tableName: 'book_loan',
      underscored: true,
    },
  );

  BookLoan.associate = (models) => {
    models.BookLoan.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetId: 'id',
    });

    models.BookLoan.belongsTo(models.User, {
      foreignKey: 'userId',
      targetId: 'id',
    });
  };

  return BookLoan;
}

export default createBookLoanModel;
