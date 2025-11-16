const { validationResult } = require("express-validator");
const User = require("../../models/User");

const updateUserRole = async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // Prevent admin from modifying their own role
        if (userId === req.user.id) {
            return res.status(400).json({ message: "You cannot change your own role" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Role updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating role:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = updateUserRole;