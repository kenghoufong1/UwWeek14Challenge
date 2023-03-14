const sequelize = require('../config/connection');
const user = require('../models/user');
const userblog = require('../models/userblog');
const blogdata = require('./blog-seeds.json');
const userblogdata = require('./userblog-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await user.bulkCreate(blogdata, {
    individualHooks: true,
    returning: true,
  });

  await userblog.bulkCreate(userblogdata, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};


seedDatabase();
