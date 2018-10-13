const User = require('./../models/User'),
      err  = require('./../errors/types');

const getUsers = async (req, res) => {
  let users = await User.find({})
    .setOptions({ limit: 5, sort: { dateAdded: -1 } })
    .exec();
  if(!users) throw new Error(err.ERROR_FINDING_USERS);

  res.status(200).json(users);
}

const getUserById = async (req, res) => {
  let user = await User
    .findById(req.params.id, 'username rooms')
    .exec();
  if(!user) throw new Error(err.ERROR_FINDING_USER_BY_ID);

  res.status(200).json(user);
}

const updateUserById = async (req, res) => {
  let user = await User
    .findByIdAndUpdate(req.params.id, req.body)
    .exec();
  if(!user) throw new Error(err.ERROR_UPDATING_USER_BY_ID);

  res.status(201).end('User updated.');
}

const createUser = async (req, res) => {
  let user = await User(req.body).save();
  if(!user) throw new Error(err.ERROR_CREATING_USER);

  res.status(201).end('Created user.');
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById
}