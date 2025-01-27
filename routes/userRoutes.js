const express = require('express');
const userRoutes = express.Router();
const { insertData, getUserData, deleteUserData, updateUser, uploadFile } = require('../controller/user-data-controller'); 
const { upload} = require ('../middlewares/multer')

userRoutes.post('/user/insert-user-data',insertData)
userRoutes.get('/user/get-user-data',getUserData)
userRoutes.delete('/user/delete-user-data/:id', deleteUserData)
userRoutes.put('/user/update-user-data/:id', updateUser);
userRoutes.post('/user/upload-file',upload.single('upload'),uploadFile)

module.exports = {userRoutes}