const Task = require("../../models/Task");

const getTaskById = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    try {
        const task = await Task.findById(taskId)
            .populate("assignedTo", "username email role")
            .populate("createdBy", "username email role");

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (userRole === "Manager" && task.createdBy._id.toString() !== userId) {
            return res.status(403).json({ message: "You are not allowed to view this task" });
        }

        if (userRole === "User" && task.assignedTo._id.toString() !== userId) {
            return res.status(403).json({ message: "You are not allowed to view this task" });
        }

        return res.status(200).json({ task });
    } catch (err) {
        console.error("Error in getTaskById:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = getTaskById;