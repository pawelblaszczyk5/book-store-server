const express = require('express');
const router = express.Router();
const database = require('./dbConnection');
const helpers = require('./helpers');

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

router.get('/getBestsellers', (req, res) => {
  database.getBestsellers().then(items => {
    res.json(items);
  });
});

router.get('/getNew', (req, res) => {
  database.getNew().then(items => {
    res.json(items);
  });
});

router.get('/getSales', (req, res) => {
  database.getSales().then(items => {
    res.json(items);
  });
});

router.post('/getBooks', (req, res) => {
  database.getFilteredBooks(req.body).then(items => {
    res.json(items);
  });
});

router.post('/sendContact', (req, res) => {
  database.saveContact(req.body).then(status => {
    res.json(status);
  });
});

router.post('/register', (req, res) => {
  const {password, confirmPassword, email} = req.body;
  if (password === confirmPassword && helpers.basicEmailValidator(email) && helpers.passwordValidator(password)) {
    database.checkIfUserExists(email).then((response) => {
      if (response) {
        database.registerUser(email, password).then((status) => {
          res.json(status);
        }, (errorStatus) => {
          res.json(errorStatus);
        });
      } else {
        res.json({
          success: false,
          message: 'user exists'
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: 'validation error'
    });
  }
});

router.post('/login', (req, res) => {
  const {email, password} = req.body;
  database.loginUser(email, password).then((response) => {
    res.json(response);
  }, (response) => {
    res.json(response);
  });
});

router.post('/authenticate', (req, res) => {
  const {jwt, userId} = req.body;
  database.authenticate(jwt, userId).then((response) => {
    res.json(response);
  }, (response) => {
    res.json(response);
  });
});


module.exports = router;
