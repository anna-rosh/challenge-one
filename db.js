const { Pool } = require('pg');
const pool = new Pool({
    user: 'annaroshchina',
    host: 'localhost',
    database: 'urls',
    port: 5432
});

module.exports.getAllUrls = () => {
    return pool.query(
        'SELECT * FROM urls'
        );
};

module.exports.insertUrl = (longUrl, shortUrl) => {
    return pool.query(
        'INSERT INTO urls (long, short) VALUES ($1, $2)', [longUrl, shortUrl]
        );
};