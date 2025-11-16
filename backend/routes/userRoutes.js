const express= require('express');
const verifyRole = require('../middleware/verifyRole');
const verifyToken = require('../middleware/verifyToken');
const getUsers = require('../handlers/users/getUsers');
const updateUserRole = require('../handlers/users/updateUserRole');
const deleteUser = require('../handlers/users/deleteUser');

const router= express.Router();
const { body, param, query } = require('express-validator');

router.get('/', [
    query('role').optional().isIn(['Admin', 'Manager', 'User']).withMessage('Invalid role query parameter'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('search').optional().isString().trim().withMessage('Search must be a string'),
], verifyToken, verifyRole('Admin', 'Manager'), getUsers)

router.patch("/:id/role", [
  param("id").isMongoId().withMessage("Invalid user ID"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["User", "Manager", "Admin"]).withMessage("Role must be User, Manager, or Admin"),
], verifyToken, verifyRole('Admin'), updateUserRole);

router.delete("/:id", [
  param("id").isMongoId().withMessage("Invalid user ID")
], verifyToken, verifyRole('Admin'), deleteUser);

module.exports=router;