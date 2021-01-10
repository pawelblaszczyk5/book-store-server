const express = require('express');
const router = express.Router();
const database = require('./dbConnection');

router.get('/', (req, res) => {
    res.send('Hello to my API');
});

router.get('/getBook', (req, res) => {
    database.getBook(Number(req.query.id)).then(items => {
        res.json(items);
    });
});

router.get('/getLimitedReviews', (req, res) => {
    database.getLimitedReviews(Number(req.query.id), Number(req.query.limit), Number(req.query.skip)).then(items => {
        res.json(items);
    });
});

router.get('/getNumberOfReviews', function (req, res) {
    database.getNumberOfReviews(Number(req.query.id)).then(number => {
        res.json(number);
    });
});

router.get('/getRecommendedBooks', (req, res) => {
    database.getRecommendedBooks(Number(req.query.id)).then(items => {
        res.json(items);
    });
});

router.post('/getBooks', (req, res) => {
    database.getFilteredBooks(req.body).then(items => {
        res.json(items);
    });
});

module.exports = router;
