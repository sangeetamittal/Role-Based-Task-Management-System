const User = require("../../models/User");
const { validationResult } = require("express-validator");

const getUsers=async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const requesterRole = req.user.role;
    const filterRole = req.query.role;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Search by username or email
    const search = req.query.search || "";

    try{
        let query = {};

        if (requesterRole === 'Manager') {
            query = { role: 'User' }; // Managers can see only users
        }

        else if (requesterRole === 'Admin') {
            if (filterRole) {
                query = { role: filterRole };
            }
        }
        
        // Search filter
        if (search) {
            query.$or = [
                { username: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        // Fetch paginated users
        const users = await User.find(query)
            .select("-password")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // Count total users that match the query
        const total = await User.countDocuments(query);

        res.status(200).json({
            users,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch(err){
        console.error('Error in getUsers: ', err)
        res.status(500).json({message: 'Server error'})
    }
}

module.exports = getUsers;