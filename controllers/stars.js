const Star = require('../models/Star');

exports.registerStar = async (req, res, next) => {
  console.log(req.body)
  const { name, appearance, personalityTraits,interests } = req.body;
  const starData = {
    name,
    appearance,
    personalityTraits,
    interests
  };
  console.log(starData)
  try {
    const newStar = await Star.createStar(starData);
    res.status(201).json(newStar);
  } catch (error) {
    res.status(500).json({ message: "Failed to create star", error: error.message });
  }
};

exports.getStars = async (req, res, next) => {
  try {
    const stars = await Star.find();
    res.status(200).json(stars);
  } catch (error) {
    res.status(500).json({ message: "Failed to get stars", error: error.message });
  }
}

// Get Single Star
exports.getStar = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const starId = req.params.id;
    const star = await Star.findById(starId);

    if (!star) {
      return res.status(404).json({ message: "Star not found" });
    }

    res.status(200).json(star);
  } catch (error) {
    res.status(500).json({ message: "Failed to get star", error: error.message });
  }
};