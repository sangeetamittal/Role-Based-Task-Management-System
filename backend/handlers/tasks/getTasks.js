const Task = require('../../models/Task')

// Manager can read all tasks but Employee can read only assigned tasks
const getTasks = async (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Search
    const search = req.query.search || "";

    try {
        let query = {};

        if (userRole === "Manager") {
            // Manager: tasks they created
            query = { createdBy: userId };
        }
        else if (userRole === "User"){
            // User: tasks assigned to them
            query = { assignedTo: userId };
        }

        // Apply search only on title (you can add description too)
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        // Fetch paginated tasks
        const tasks = await Task.find(query)
            .populate("assignedTo", "username email role")
            .populate("createdBy", "username email role")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // Get total count (for pagination UI)
        const total = await Task.countDocuments(query);

        return res.status(200).json({
            tasks,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (err) {
        console.error('Error in getTasks:', err);
        res.status(500).json({ message: 'Server error' })
    }
};

module.exports=getTasks;