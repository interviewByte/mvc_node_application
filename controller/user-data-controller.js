const express = require('express');
const userModel = require("../models/userData");

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
module.exports = { insertData, getUserData, deleteUserData, updateUser }; // Correctly exporting 'insertData'
