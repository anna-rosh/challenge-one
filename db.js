const { Pool } = require('pg');
const key = require('./secrets.json');
const pool = new Pool(key);

module.exports.insertUrl = (longUrl, shortUrl) => {
    return pool.query(
        'INSERT INTO urls (long, short) VALUES ($1, $2)', [longUrl, shortUrl]
        );
};

module.exports.getLongUrlByShort = (shortUrl) => {
    return pool.query(
        'SELECT long FROM urls WHERE short = $1', [shortUrl]
        );
};