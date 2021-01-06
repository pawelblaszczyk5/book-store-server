const express = require('express');
const router = express.Router();
const database = require('./dbConnection');

router.get('/', (req, res) => {
    res.send('Hello to my API');
});

router.get('/getLimitedBooks/', function (req, res) {
    database.getLimitedBooks(Number(req.query.limit), Number(req.query.skip)).then(items => {
        res.json(items);
    });
});

router.get('/getBook', function (req, res) {
    database.getBook(Number(req.query.id)).then(items => {
        res.json(items);
    });
});

router.get('/getLimitedReviews', function (req, res) {
    database.getLimitedReviews(Number(req.query.id), Number(req.query.limit), Number(req.query.skip)).then(items => {
        res.json(items);
    });
});

router.get('/getNumberOfReviews', function (req, res) {
    database.getNumberOfReviews(Number(req.query.id)).then(number => {
        res.json(number);
    });
});

router.get('/getRecommendedBooks', function (req, res) {
    database.getRecommendedBooks(Number(req.query.id)).then(items => {
        res.json(items);
    });
});

module.exports = router;
