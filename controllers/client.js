const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('tmp').collection('client').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('tmp').collection('client').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createClient = async (req, res) => {
  // mark each post with the date and time created
  let timestamp = Date().toLocaleString();
  const client = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    time_created: timestamp
  };
  const response = await mongodb.getDb().db('tmp').collection('client').insertOne(client);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Something happened in contact.');
  }
};

const updateClient = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  // gather previous data
  const result = await mongodb.getDb().db('tmp').collection('client').find({ _id: userId });
  result.toArray().then((lists) => {
    updateData(lists[0]);
  });

  async function updateData(item) {
    
    // data not included in put request will remain
    const client = {
      firstName: req.body.firstName || item.firstName,
      lastName: req.body.lastName || item.lastName,
      email: req.body.email || item.email,
      time_created: item.time_created
    };

    const response = await mongodb.getDb().db('tmp').collection('client').replaceOne({ _id: userId }, client);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Something happened in contact.');
    }
  }
};

const deleteClient = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('tmp').collection('client').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something happened in contact.');
  }
};

module.exports = { getAll, getSingle, createClient, updateClient, deleteClient };