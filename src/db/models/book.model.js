/**
 * Model class for "Book"
 * @param {Sequelize} sequelize - sequelize object
 * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
 *
 * @returns Book - sequelize model for the book entity
 */
function createBookModel(sequelize, DataTypes) {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'book_author',
          key: 'id',
        },
      },
      title: { type: DataTypes.STRING, allowNull: false },
      ISBN: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'isbn',
      },
      availableQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      shelfNumber: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: 'book',
      underscored: true,
      timestamps: true, // adds the `createdAt` and `updatedAt` attributes
    },
  );

  Book.associate = (models) => {
    models.Book.belongsTo(models.BookAuthor, {
      foreignKey: 'authorId',
      targetId: 'id',
    });

    models.Book.hasMany(models.BookLoan, {
      foreignKey: 'bookId',
      targetId: 'id',
    });
  };

  return Book;
}

export default createBookModel;
