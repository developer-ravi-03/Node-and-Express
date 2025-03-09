const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const Mongo_URL =
  "mongodb+srv://root:root@completecoding.w0wmg.mongodb.net/?retryWrites=true&w=majority&appName=CompleteCoding";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(Mongo_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log("Error in connecting to the database : ", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("No database found");
  }
  return _db;
};
exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
