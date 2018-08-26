require('dotenv').config({path: '../.env'});

module.exports =  {
    client: 'mysql',
    connection: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'sys'
    }
};
