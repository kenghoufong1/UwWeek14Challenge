const user = require('./user');
const userblog = require('./userblog');

userblog.belongsTo(user,{
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

module.exports = {
    user,
    userblog,
  };