/**
 * Model class for "BookAuthor"
 * @param {Sequelize} sequelize - sequelize object
 * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
 *
 * @returns BookAuthor - sequelize model for the book author entity
 */
function createBookAuthorModel(sequelize, DataTypes) {
  const BookAuthor = sequelize.define(
    'BookAuthor',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: 'book_author',
      underscored: true,
    },
  );

  BookAuthor.associate = (models) => {
    models.BookAuthor.hasMany(models.Book, {
      foreignKey: 'authorId',
      targetId: 'id',
    });
  };

  return BookAuthor;
}

export default createBookAuthorModel;
