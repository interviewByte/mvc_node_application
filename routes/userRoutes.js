const express = require('express');
const userRoutes = express.Router();
const { insertData, getUserData, deleteUserData, updateUser } = require('../controller/user-data-controller'); // Correctly spelled

userRoutes.post('/user/insert-user-data',insertData)
userRoutes.get('/user/get-user-data',getUserData)
userRoutes.delete('/user/delete-user-data/:id', deleteUserData)
userRoutes.put('/user/update-user-data/:id', updateUser);

module.exports = {userRoutes}