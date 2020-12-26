const express = require('express');
const router = express.Router();
const database = require('./dbConnection');

router.get('/', (req, res) => {
    res.send('Hello to my API');
});

router.get('/limitSkip/:limit/:skip', function (req, res) {
    database.getBooksLimitAndSkip(Number(req.params.limit), Number(req.params.skip)).then(items => {
        res.json(items);
    });
});

router.get('/getBookById/:id', function (req, res) {
    database.getBookById(Number(req.params.id)).then(items => {
        res.json(items);
    });
});

router.get('/getReviewsByBookId/:id', function (req, res) {
    database.getReviewsByBookId(Number(req.params.id)).then(items => {
        res.json(items);
    });
});

module.exports = router;
