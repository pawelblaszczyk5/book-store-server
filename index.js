const express = require("express");
const app = express();
const mongo = require("mongodb").MongoClient;
require("dotenv").config();
const url = `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.USER}`;
let databse;
let collection;
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.get("/", (req, res) => {
    res.send("Hello to my API");
});
app.get("/getall", (req, res) => {
    collection.find().toArray((err, items) => {
        res.json(items);
    });
});
app.get("/limitSkip/:limit/:skip", function (req, res) {
    collection
        .find()
        .limit(+req.params.limit)
        .skip(+req.params.skip)
        .toArray((err, items) => {
            res.json(items);
        });
});
app.get("/getById/:id/", function (req, res) {
    collection.findOne({ id: +req.params.id }, (err, item) => {
        res.json(item);
    });
});
const init = () => {
    mongo.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, client) => {
            if (err) {
                console.error(err);
                return;
            }
            databse = client.db(`${process.env.USER}`);
            collection = databse.collection("produkty");
        }
    );
};
init();
