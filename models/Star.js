const mongoose = require('mongoose');

const StarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  appearance: {
    type: String, // This can be a text description or a URL to an image
    required: false
  },
  personalityTraits: [{
    type: String
  }],
  interests: [{
    type: String
  }],
  interactionHistory: [{
    date: Date,
    interaction: String
  }],
  customizationSettings: {
    type: Map,
    of: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});



StarSchema.statics.createStar = async function (starData) {  try {
    // Create a new Star instance with the provided data
    const star = new Star(starData);

    // Save the star to the database
    await star.save();

    return star;
  } catch (error) {
    console.error("Error creating new star:", error);
    throw error;
  }
};



const Star = mongoose.model('Star', StarSchema);

module.exports = Star;