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

const getLimitedBooks = (limit, skip) => {
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

const getBook = (idToSearch) => {
    return new Promise((resolve) => {
        booksCollection
            .findOne({id: idToSearch}, (err, item) => {
                resolve(item);
            });
    })
};

const getLimitedReviews = (idToSearch, limit, skip) => {
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

const getNumberOfReviews = (idToSearch) => {
    return new Promise((resolve) => {
        resolve(reviewsCollection.countDocuments({bookId: idToSearch}));
    });
};

module.exports.init = init;
module.exports.getLimitedBooks = getLimitedBooks;
module.exports.getBook = getBook;
module.exports.getLimitedReviews = getLimitedReviews;
module.exports.getNumberOfReviews = getNumberOfReviews;
