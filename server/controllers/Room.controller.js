const Room = require('./../models/Room'),
      User = require('./../models/User'),
      Message = require('./../models/Message'),
      err  = require('./../errors/types'),
      mongoose = require('mongoose');

const getRooms = async (req, res) => {
  let rooms = await Room.find({})
    .setOptions({ limit: 5, sort: { dateAdded: -1 } })
    .exec();
  if(!rooms) throw new Error(err.ERROR_FINDING_ROOMS);

  res.status(200).json(rooms);
}

const getRoomById = async (req, res) => {
  let room = await Room
    .findById(req.params.roomId)
    .exec();
  if(!room) throw new Error(err.ERROR_FINDING_ROOM_BY_ID);

  res.status(200).json(room);
}

const updateRoomById = async (req, res) => {
  let room = await Room
    .findByIdAndUpdate(req.params.roomId, req.body)
    .exec();
  if(!room) throw new Error(err.ERROR_UPDATING_ROOM_BY_ID);

  res.status(201).end('Updated room.');
}

const createRoom = async (req, res) => {
  const { creatorId, targetId, name} = req.body;

  let creator = await User.findById(creatorId);
  let target = await User.findById(targetId);
  if(!creator || !target) throw new Error(err.ERROR_CREATING_ROOM);

  let roomId = mongoose.Types.ObjectId();

  let room = await Room({
    name: roomId,
    _id: roomId,
    users: [creator._id, target._id]
  });
  if(!room) throw new Error(err.ERROR_CREATING_ROOM);

  creator.rooms = (creator.rooms || []);
  creator.rooms.push(roomId);
  target.rooms = (target.rooms || []);
  target.rooms.push(roomId);

  await room.save();
  await creator.save();
  await target.save();
    
  res.status(201).end('Created room.');
}

const getRoomMessages = async (req, res) => {
  let messages = await Message
    .find({ roomId: req.params.roomId }, '-roomId -__v')
    .setOptions({ sort: { dateAdded: -1 } })
    .exec();
  if(!messages) throw new Error(err.ERROR_FINDING_ROOM_MESSAGES);

  res.status(200).json(messages);
}

module.exports = {
  getRooms,
  getRoomById,
  updateRoomById,
  createRoom,
  getRoomMessages
};