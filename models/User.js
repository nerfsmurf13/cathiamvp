const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { // Ensure to hash passwords in production
    type: String,
    required: true
  },
  subscription: {
    type: String,
    required: true
  },
  customerId: {
    type: String,
    required: true
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Star'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ConnectionSchema.methods.addFavoriteStar = async (userId, starId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.favorites.includes(starId)) {
      user.favorites.push(starId);
      await user.save();
    }
    return user;
  } catch (error) {
    console.error("Error in addFavoriteStar:", error);
    throw error;
  }
};

module.exports = mongoose.model('User', UserSchema);
