const mongo = require('mongodb').MongoClient;
const auth = require('./auth');

let database;
let booksCollection, reviewsCollection, contactCollection, usersCollection;

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
      contactCollection = database.collection('contact');
      usersCollection = database.collection('users');
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

const getRecommendedBooks = () => {
  return new Promise((resolve) => {
    booksCollection
      .aggregate([{$sample: {size: 8}}])
      .toArray((err, item) => {
        resolve(item);
      })
  });
};

const getBestsellers = () => {
  return new Promise((resolve) => {
    booksCollection
      .aggregate([{$match: {bestseller: true}}, {$sample: {size: 8}}])
      .toArray((err, item) => {
        resolve(item);
      })
  });
};

const getNew = () => {
  return new Promise((resolve) => {
    booksCollection
      .aggregate([{$match: {new: true}}, {$sample: {size: 8}}])
      .toArray((err, item) => {
        resolve(item);
      })
  });
};

const getSales = () => {
  return new Promise((resolve) => {
    booksCollection
      .aggregate([{$match: {discountedPrice: {$ne: null}}}, {$sample: {size: 8}}])
      .toArray((err, item) => {
        resolve(item);
      })
  });
};


const getFilteredBooks = (filter) => {
  const filterObject = {}
  if (filter.searchPhrase) {
    filterObject.$or = [
      {author: new RegExp(filter.searchPhrase || '', 'gi')},
      {title: new RegExp(filter.searchPhrase || '', 'gi')},
      {ISBN: new RegExp(filter.searchPhrase || '', 'gi')},
      {publisher: new RegExp(filter.searchPhrase || '', 'gi')}
    ]
  }
  filterObject.publication = {$gte: filter.dateFrom || -Infinity, $lt: filter.dateTo || Infinity};
  if (filter.genres.length) {
    filterObject.genre = {$in: filter.genres};
  }
  if (filter.sale) {
    filterObject.discountedPrice = {$ne: null}
  }
  if (filter.bestseller) {
    filterObject.bestseller = true;
  }
  if (filter.new) {
    filterObject.new = true
  }
  let sortObject = {};
  if (filter.sortBy !== 'default') {
    sortObject[filter.sortBy.name] = filter.sortBy.direction === 'asc' ? 1 : -1;
  }
  sortObject._id = 1
  return new Promise((resolve) => {
    booksCollection
      .find(filterObject)
      .sort(sortObject)
      .limit(filter.limit)
      .skip(filter.skip)
      .toArray((err, item) => {
        resolve(item);
      });
  });
}

const saveContact = (contactData) => {
  return new Promise((resolve) => {
    contactCollection.insertOne(contactData, {}, (err, res) => {
      resolve(res.insertedCount === 1);
    })
  });
};

const registerUser = (email, password) => {
  return new Promise((resolve, reject) => {
    auth.hashPassword(password).then((hash) => {
      usersCollection.insertOne({email: email, password: hash}, {}, (err, res) => {
        resolve(res.insertedCount === 1 ? 'registered' : 'register error');
      });
    }, () => {
      reject('hash error');
    })
  });
};

const checkIfUserExists = async(email) => {
  return await usersCollection.find({email: email}).count() === 0;
};

const loginUser = (email, password) => {
  return new Promise((resolve) => {
    usersCollection.find({email: email}).toArray((err, res) => {
      if (res.length === 1) {
        auth.comparePassword(password, res[0].password).then((res) => {
          resolve(res ? 'success' : 'bad login');
        }, (error) => {
          resolve(error)
        })
      } else {
        resolve('error')
      }
    });
  });
}

module.exports.init = init;
module.exports.getLimitedBooks = getLimitedBooks;
module.exports.getBook = getBook;
module.exports.getLimitedReviews = getLimitedReviews;
module.exports.getNumberOfReviews = getNumberOfReviews;
module.exports.getRecommendedBooks = getRecommendedBooks;
module.exports.getFilteredBooks = getFilteredBooks;
module.exports.getBestsellers = getBestsellers;
module.exports.getSales = getSales;
module.exports.getNew = getNew;
module.exports.saveContact = saveContact;
module.exports.checkIfUserExists = checkIfUserExists;
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;