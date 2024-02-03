/**
 * Model class for "BookLoan"
 * @param {Sequelize} sequelize - sequelize object
 * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
 *
 * @returns BookLoan - sequelize model for the book loan entity
 */
function createBookLoanModel(sequelize, DataTypes) {
  const BookLoan = sequelize.define(
    'bookLoan',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      borrowerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'borrower',
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
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          notNull: true,
        },
      },
      checkInDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      dueDate: {
        type: DataTypes.DATEONLY,
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

    models.BookLoan.belongsTo(models.Borrower, {
      foreignKey: 'borrowerId',
      targetId: 'id',
    });
  };

  return BookLoan;
}

export default createBookLoanModel;
