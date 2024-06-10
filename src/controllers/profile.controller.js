const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  const { preferredCategories, preferredSources } = req.body;

  const profileFields = {};
  if (preferredCategories) profileFields.preferredCategories = preferredCategories;
  if (preferredSources) profileFields.preferredSources = preferredSources;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
