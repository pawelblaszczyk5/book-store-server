const express = require('express');
const router = express.Router();
const database = require('./dbConnection');

router.get('/', (req, res) => {
    res.send('Hello to my API');
});

router.get('/getLimitedBooks/:limit/:skip', function (req, res) {
    database.getLimitedBooks(Number(req.params.limit), Number(req.params.skip)).then(items => {
        res.json(items);
    });
});

router.get('/getBook/:id', function (req, res) {
    database.getBook(Number(req.params.id)).then(items => {
        res.json(items);
    });
});

router.get('/getLimitedReviews/:id/:limit/:skip', function (req, res) {
    database.getLimitedReviews(Number(req.params.id), Number(req.params.limit), Number(req.params.skip)).then(items => {
        res.json(items);
    });
});

router.get('/getNumberOfReviews/:id/', function (req, res) {
    database.getNumberOfReviews(Number(req.params.id)).then(number => {
        res.json(number);
    });
});

module.exports = router;
