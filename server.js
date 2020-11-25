const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const { nanoid } = require('nanoid');
const axios = require('axios');

app.use(cors());
app.use(express.json());

app.post('/url', async (req, res) => {
    // expect an object {value: long_url} in req.body
    let { value: longUrl } = req.body;
    // don't accept empty input. stop executing if so and send an error message to the clien
    if (!longUrl) {
        res.json({
            error: 'Please, enter the URL you want to shorten into the field below.'
        });
        return;
    } 
    // prepare the url for storing in the right format and checking validity
    if (!longUrl.startsWith('https://') && !longUrl.startsWith('http://')) {
        longUrl = `https://${longUrl}`;
    }
    // check if the url is valid, if not send an error message to the client and stop executing
    try {
        await axios.get(longUrl);
    } catch (err) {
        res.json({
            error: 'This URL is invalid. Please, try again.'
        });
        return;
    } 
    // generate a random string
    const shortUrl = nanoid(10);
    // insert the valind long url and the randomly generaten short into the db
    try {
        await db.insertUrl(longUrl, shortUrl);
        res.json({
            error: false,
            shortUrl
        });
    } catch (err) {
        console.log('error in insertUrl: ', err);
        res.json({
            error: 'Unfortunately, an error occured. Please, try again.'
        });
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

// app.get('*', (req, res) => {
//     res.sendFile
// })

app.listen(process.env.PORT || 8080, () => {
    console.log('hello there! the server is listening! 💁');
});