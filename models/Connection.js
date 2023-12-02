const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  starId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Star',
    required: true
  },
  highlights: [{
    date: Date,
    summary: String
  }],
  preferences: {
    likes: [String],
    dislikes: [String]
  },
  lastInteraction: {
    type: Date,
    default: Date.now
  }
});

ConnectionSchema.statics.addNewInteraction = async function (userId, starId, summary, date = new Date()) {
  try {
    return await this.findOneAndUpdate(
      { userId, starId },
      { 
        $push: { highlights: { date, summary } },
        $set: { lastInteraction: date }
      },
      { new: true, upsert: true }
    );
  } catch (error) {
    console.error("Error in addNewInteraction:", error);
    throw error;
  }
};

const Connection = mongoose.model('Connection', ConnectionSchema);

module.exports = Connection;