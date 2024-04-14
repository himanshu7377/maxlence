
const dbConfig = {
    production: {
        "DB_HOST": "maxlence-maxlence.b.aivencloud.com",
        "DB_PORT": 14738,
        "DB_NAME": "user",
        "DB_USER_NAME": "avnadmin",
        "DB_PASSWORD": process.env.DB_PASSWORD,

    },
    development: {
        "DB_HOST": "localhost",
        "DB_PORT": 3306,
        "DB_NAME": "defaultdb",
        "DB_USER_NAME": "root",
        "DB_PASSWORD2": process.env.DB_PASSWORD2
    },
    testing: {
        "DB_HOST": "localhost",
        "DB_PORT": 3306,
        "DB_NAME": "defaultdb",
        "DB_USER_NAME": "root",
        "DB_PASSWORD": ""
    }
}

module.exports = dbConfig;

