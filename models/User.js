const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}

// define table columns and configuration

User.init(
    {
        // define an id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            //if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the length (len) of the password must be at least four characters long
                len: [4]
            }
        } 
    },
    {
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,

        //don't pluralize name of database table
        freezeTableName: true,

        //use underscores instead of camel-casing
        underscored: true,

        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;