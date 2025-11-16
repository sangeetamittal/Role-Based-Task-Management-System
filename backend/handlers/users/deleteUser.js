const { validationResult } = require("express-validator");
const User = require("../../models/User");

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    deletedUser.password = undefined;
    return res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = deleteUser;