const express=require('express');
const router=express.Router();
const verifyToken=require('../middleware/verifyToken')
const verifyRole = require('../middleware/verifyRole');

const createTask=require('../handlers/tasks/createTask')
const getTasks=require('../handlers/tasks/getTasks')
const updateTask=require('../handlers/tasks/updateTask')
const deleteTask=require('../handlers/tasks/deleteTask');
const getTaskById = require('../handlers/tasks/getTaskById');

const {check, param, query} =require('express-validator');

router.post('/', [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').optional().isString().withMessage('Description must be a string'),
    check('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status'),
    check('assignedTo').isMongoId().withMessage('AssignedTo must be a valid Mongo ID'),
    check('dueDate').isISO8601().withMessage('Due date must be a valid date'),
], verifyToken, verifyRole('Admin', 'Manager'), createTask)

router.get('/', [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('search').optional().isString().trim().withMessage('Search must be a string'),
],verifyToken, verifyRole('Admin', 'Manager', 'User'), getTasks)

router.put('/:id', [
    param('id').isMongoId().withMessage('Invalid task ID'),
    check('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status'),
    check('title').optional().isString(),
    check('description').optional().isString(),
    check('dueDate').optional().isISO8601(),
    check('assignedTo').optional().isMongoId(),
], verifyToken, verifyRole('Admin', 'Manager', 'User'), updateTask)

router.delete('/:id', [
    param('id').isMongoId().withMessage('Invalid task ID')
], verifyToken, verifyRole('Admin', 'Manager'), deleteTask)

router.get("/:id", [
    param('id').isMongoId().withMessage('Invalid task ID')
], verifyToken, verifyRole('Admin', 'Manager', 'User'), getTaskById);

module.exports=router;