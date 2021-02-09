const express = require('express')
const dbData=require('./db.js');



let routerFns =  {
    //获取学生信息
    getStudents(req, res, callback) {
        dbData.getStudents('students', function(result){
            res.send(result);
            callback && callback();
        })
    },
    //删除学生信息
    deleteStudent(req, res) {
        console.log(req);
        let params = {name:req.query.name};
        dbData.deleteStudent('students',params ,function(result){
            res.send(result);
        })
    },
    //批量上传学生信息
    addStudentsUpload(req, res, data,callback) {
        dbData.addStudents('students', data, function(result){
            res.send(result);
            callback && callback();
        })
    },

    //获取题库信息
    getExerciseList(req, res, callback) {
        dbData.getExerciseList('exercises', function(result){
            res.send(result);
            callback && callback();
        })
    },
    uploadExerciseList(req,res,params) {
        dbData.uploadExercise('exercises',params, function(result){
            res.send(result);
        })
    },
    //删除题目
    deleteExercise(req, res) {
        let params = {key:req.query.key};
        dbData.deleteExercise('exercises',params ,function(result){
            res.send(result);
        })
    },
}

module.exports = routerFns;