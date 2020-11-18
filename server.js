const express = require('express');
const app = express();
const db = require('./db');
const { nanoid } = require('nanoid');

app.use(express.json());

app.post('/url', async (req, res) => {
    // expect an object {value: long_url} in req.body
    let { value: longUrl } = req.body;
    // don't accept empty input
    if (!longUrl) {
        res.json({ error: true });
        return;
    } 
    // prepare the url for storing in the right format
    if (!longUrl.startsWith('https://') && !longUrl.startsWith('http://')) {
        longUrl = `https://${longUrl}`;
    }
    // generate a random string
    const shortUrl = nanoid(10);

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

app.get('/:shortUrl', async (req, res) => {
    // get the shortUrl from req.params
    const { shortUrl } = req.params;

    try {
        const { rows } = await db.getLongUrlByShort(shortUrl);
        res.redirect(rows[0].long);
    } catch (err) {
        console.log('err in getLongUrlByShort: ', err);
        res.status(400).send('Invalid URL');
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log('hello there! the server is listening! 💁');
});