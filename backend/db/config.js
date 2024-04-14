
const dbConfig = {
    production: {
        "DB_HOST": "maxlence-maxlence.b.aivencloud.com",
        "DB_PORT": 14738,
        "DB_NAME": "user",
        "DB_USER_NAME": "avnadmin",
        "DB_PASSWORD": "AVNS_u0pEwhuWWUjbmQ59G-f",

    },
    development: {
        "DB_HOST": "localhost",
        "DB_PORT": 3306,
        "DB_NAME": "defaultdb",
        "DB_USER_NAME": "root",
        "DB_PASSWORD": "Himanshu@7377"
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

