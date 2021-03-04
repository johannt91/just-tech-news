const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, { //link posts to the ID column in user model via foreign key pair of user_id in Post model
    foreignKey: 'user_id'
});

Post.belongsTo(User, { // defining the relationship of Post model to the User
    foreignKey: 'user_id',
});

module.exports = { User, Post };