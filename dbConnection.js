const mongo = require('mongodb').MongoClient;
let database;
let booksCollection, reviewsCollection;

const init = () => {
    mongo.connect(
        `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.USER}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, client) => {
            if (err) {
                console.error(err);
                return;
            }
            database = client.db(process.env.USER);
            booksCollection = database.collection('products');
            reviewsCollection = database.collection('reviews');
        }
    );
};

const getBooksLimitAndSkip = (limit, skip) => {
    return new Promise((resolve) => {
        booksCollection
            .find()
            .limit(limit)
            .skip(skip)
            .toArray((err, items) => {
                resolve(items);
            });
    });
};

const getBookById = (idToSearch) => {
    return new Promise((resolve) => {
        booksCollection
            .findOne({id: idToSearch}, (err, item) => {
                resolve(item);
            });
    })
};

const getReviewsByBookId = (idToSearch, limit, skip) => {
    return new Promise((resolve) => {
        reviewsCollection
            .find({bookId: idToSearch})
            .limit(limit)
            .skip(skip)
            .toArray((err, item) => {
            resolve(item);
        });
    })
};

const getNumberOfReviewsByBookId = (idToSearch) => {
    return new Promise((resolve) => {
        resolve(reviewsCollection.count({bookId: idToSearch}));
    });
};

module.exports.init = init;
module.exports.getBooksLimitAndSkip = getBooksLimitAndSkip;
module.exports.getBookById = getBookById;
module.exports.getReviewsByBookId = getReviewsByBookId;
module.exports.getNumberOfReviewsByBookId = getNumberOfReviewsByBookId;
