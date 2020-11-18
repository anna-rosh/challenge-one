const express = require('express');
const app = express();
const db = require('./db');
const { nanoid } = require('nanoid');

app.use(express.json());

app.post('/url', async (req, res) => {
    // expect an object {value: long_url} in req.body
    let { value: longUrl } = req.body;

    if (!longUrl.startsWith('https://') && !longUrl.startsWith('http://')) {
        console.log('accessed the if statement checking if the url has https');
        longUrl = `https://${longUrl}`;
    }

    const shortUrl = nanoid(10);
    console.log('short random url: ', shortUrl);

    try {
        await db.insertUrl(longUrl, shortUrl);
        res.json({
            error: false,
            shortUrl
        });
    } catch (err) {
        console.log('error in insertUrl: ', err);
        res.json({ error: true });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log('hello there! the server is listening! 💁');
});