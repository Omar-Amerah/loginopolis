const {sequelize} = require('./db');
const {User} = require('./');
const users = require('./seedData');
const {Book} = require('./');
const books = require('./bookData');

const bcrypt = require('bcrypt')
const SALT_COUNT =5

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  users.map(async (item) => {
    const hashedpass = await bcrypt.hash(item.password, SALT_COUNT)
    await User.create({username: item.username, password: hashedpass})
  })
  Book.bulkCreate(books)

    let onebook = await Book.findByPk(1)
    let oneuser = await User.findByPk(1)
    onebook.setUser(oneuser)
};

module.exports = seed;
