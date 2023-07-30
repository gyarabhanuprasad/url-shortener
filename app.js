const express = require('express');
const bodyParser = require('body-parser');
const { customAlphabet } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
const urlDatabase = {};

app.post('/api/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortUrl = nanoid();

    urlDatabase[shortUrl] = longUrl;

    res.json({ shortUrl });
});

app.get('/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;
    const longUrl = urlDatabase[shortUrl];

    if (!longUrl) {
        return res.status(404).send('URL not found.');
    }

    res.redirect(longUrl);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
