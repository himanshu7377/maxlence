const Sequelize = require('sequelize');
const db = require('../db/database.js');

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: 'user'
    },
    isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    emailVerificationToken: {
        type: Sequelize.STRING,
        allowNull: true
    },
    emailVerificationTokenExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    resetToken: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
);

module.exports = User;
