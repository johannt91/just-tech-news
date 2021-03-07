const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

User.hasMany(Post, { //link posts to the ID column in user model via foreign key pair of user_id in Post model
    foreignKey: 'user_id'
});

Post.belongsTo(User, { // defining the relationship of Post model to the User
    foreignKey: 'user_id',
});

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post__id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote };