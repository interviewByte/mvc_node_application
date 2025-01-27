const express = require('express');
const userModel = require("../models/userData");
const fileUploaded = require("../models/fileData")

const insertData = async (req, res) => {
    const data = req.body;
    try {
        const userData = new userModel(data);
        await userData.save()
            .then(() => {
                res.send({ "status": 1, "message": "Save data in Database", "res": userData });
            })
            .catch(err => {
                res.send({ "status": 0, "message": "something error to save data", "error": err });
            });
    } catch (error) {
        res.send({ "error": error });
    }
};
const getUserData =  async(req, res) => {   
    try {
        const userData =  await userModel.find()
        res.send({"status": 1,"message":"Successfully get data","res":userData})
    } catch (error) {
        res.send({"error":error})
    }
}
const deleteUserData = async(req, res) => {
    const id = req.params.id;
    console.log("wefhuwhfuwe",id)
    try {
        const userData =  await userModel.findByIdAndDelete({_id:id});
        res.send({"message":"Successfully Deleted","status":1,"res":userData})
       
    } catch (error) {
        res.send({"error":error})
    }
}
const updateUser = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const userData =  await userModel.findByIdAndUpdate(id,data);
        res.send({status:1,"data":data})
    } catch (error) {
        res.send({"error":error})
    }
}
const FileModel = require("../models/fileData");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ status: 0, message: "No file uploaded" });
    }

    // Save file metadata to database
    const fileData = new fileUploaded({
      fileName: req.file.filename,
      filePath: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`, // Generate URL
      fileSize: req.file.size,
    });

    const savedFile = await fileData.save();

    // Respond with the file URL
    res.status(201).send({
      status: 1,
      message: "File uploaded successfully",
      fileUrl: savedFile.filePath,
    });
  } catch (error) {
    res.status(500).send({ status: 0, message: "File upload failed", error });
  }
};


module.exports = { insertData, getUserData, deleteUserData, updateUser, uploadFile }; // Correctly exporting 'insertData'
