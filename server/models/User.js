const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const options = {
  strict: 'throw'
};

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    rooms: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  },
  options
);

module.exports = mongoose.model('user', userSchema, 'users');
