const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('addressbook').collection('address').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('addressbook').collection('address').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createAddress = async (req, res) => {
  const address = {
    resident: req.body.resident,
    number: req.body.number,
    street: req.body.street,
    unit: req.body.unit,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zip: req.body.zip
  };
  const response = await mongodb.getDb().db('addressbook').collection('address').insertOne(address);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Something happened in contact.');
  }
};

const updateAddress = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const address = {
    resident: req.body.resident,
    number: req.body.number,
    street: req.body.street,
    unit: req.body.unit,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zip: req.body.zip
  };
  const response = await mongodb.getDb().db('addressbook').collection('address').replaceOne({ _id: userId }, address);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something happened in contact.');
  }
};

const deleteAddress = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const address = await mongodb.getDb().db('addressbook').collection('address').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something happened in contact.');
  }
};

module.exports = { getAll, getSingle, createAddress, updateAddress, deleteAddress };