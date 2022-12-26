const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User', // Refer to User Schema
    },
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // MongoDB will give us a created at and updated at just by setting this options to true
  }
)

//Create the sequence number
noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500,
})

module.exports = mongoose.model('Note', noteSchema)
