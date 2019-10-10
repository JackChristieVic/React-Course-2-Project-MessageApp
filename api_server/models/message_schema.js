const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  msg: String,
  // F.P.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    maxlength: 15
  }
})

module.exports = mongoose.model('message', messageSchema);