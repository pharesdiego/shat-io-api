const Message = require('./../models/Message'),
  err = require('./../errors/types');

const getMessages = async (req, res) => {
  let messages = await Message.find({})
    .setOptions({ limit: 10 })
    .exec();
  if (!messages) throw new Error(err.ERROR_FINDING_MESSAGES);

  res.status(200).json(messages);
};

const createMessage = async (req, res) => {
  let message = await Message(req.body).save();
  if (!message) throw new Error(err.ERROR_CREATING_MESSAGE);

  res.status(201).end('Created message.');
};

const getMessageById = async (req, res) => {
  let message = await Message.findById(req.params.messageId).exec();
  if (!message) throw new Error(err.ERROR_FINDING_MESSAGE_BY_ID);

  res.status(200).json(message);
};

const updateMessageById = async (req, res) => {
  let message = await Message.findByIdAndUpdate(req.body).exec();
  if (!message) throw new Error(err.ERROR_UPDATING_MESSAGE_BY_ID);

  res.status(201).end('Updated message.');
};

module.exports = {
  getMessages,
  createMessage,
  getMessageById,
  updateMessageById
};
