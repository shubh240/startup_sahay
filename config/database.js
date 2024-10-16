const { Client } = require('pg');
let con = {}

    con = new Client({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASS,
        port: 5432,
    });

con.connect().then(() => {
    console.log("databased connected successfully");
}).catch((err) => {
    console.log("error db", err);
});

module.exports = con;