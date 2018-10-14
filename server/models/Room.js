const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const options = {
  strict: 'throw'
};

const roomSchema = Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    users: {
      type: [Schema.Types.ObjectId],
      required: true
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  },
  options
);

module.exports = mongoose.model('room', roomSchema, 'rooms');
