const {Sequelize, sequelize} = require('./db');

const Book = sequelize.define('book', {
  title: Sequelize.STRING
});

module.exports = { Book };
