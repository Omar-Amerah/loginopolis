const {User} = require('./User');
const {Book} = require('./Book');
const {sequelize, Sequelize} = require('./db');

module.exports = {
    User,
    Book,
    sequelize,
    Sequelize
};
