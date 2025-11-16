const Task = require('../../models/Task')
const { validationResult } = require('express-validator');

// Admin → update anything
// Manager → update only tasks they created
// User → update only status of tasks assigned to them

const updateTask = async (req, res) => {

    //Checking for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const taskId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;
    const updates = req.body;

    try {
        const task = await Task.findById(taskId)
        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        if (userRole === 'User') {
            if (task.assignedTo.toString() != userId) {
                return res.status(403).json({ message: 'You cannot update this task' })
            }
            if (!updates.status) {
                return res.status(400).json({ message: 'Users can only update task status' })
            }
            task.status = updates.status;
        }

        else if(userRole === 'Manager') {
            if (task.createdBy.toString() != userId) {
                return res.status(403).json({ message: 'You cannot update this task' })
            }   
            Object.assign(task, updates);
        }

        else if (userRole === 'Admin') {
            Object.assign(task, updates);
        }

        const updatedTask = await task.save();

        res.status(200).json({ message: 'Task updated', task: updatedTask })
    }
    catch (err) {
        console.error('Error in updateTask:', err)
        res.status(500).json({ message: 'Server error' })
    }

};

module.exports=updateTask;