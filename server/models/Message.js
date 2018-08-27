const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const options = {
  strict: 'throw'
};

const messageSchema = Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'text'],
    required: true
  },
  data: {
    type: Schema.Types.Mixed,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  }
}, options);

module.exports = mongoose.model('message', messageSchema, 'messages');

