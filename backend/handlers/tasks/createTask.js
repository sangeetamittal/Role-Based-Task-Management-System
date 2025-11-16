const Task = require('../../models/Task')
const User = require('../../models/User')
const { validationResult } = require('express-validator');

// Task can be created by Admin and Managers only
const createTask = async (req, res) => {

    //Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, assignedTo, dueDate, status } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    try {

        const assignedUser = await User.findById(assignedTo);

        if (!assignedUser) {
            return res.status(404).json({ message: 'Assigned user not found' });
        }
        
        if (userRole === 'Manager' && assignedUser.role !== 'User') {
            return res.status(403).json({
                message: 'Managers can assign tasks only to Users'
            });
        }

        const newTask = new Task({
            title,
            description,
            assignedTo,
            dueDate,
            status,
            createdBy: userId
        });

        const savedTask = await newTask.save();

        res.status(201).json({ message: 'Task created', Task: savedTask })
    }
    catch (err) {
        console.error('Error in createTask:', err);
        res.status(500).json({ message: 'Server error' })
    }
};

module.exports=createTask;