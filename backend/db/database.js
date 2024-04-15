const { Sequelize } = require('sequelize');
const dbConfig = require('./config.js');

// Destructure database configuration
const { DB_HOST, DB_PORT, DB_NAME, DB_USER_NAME, DB_PASSWORD } = dbConfig.production;

// Create Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false, 
});

// Test the database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log(`Connected to the database successfully!`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;