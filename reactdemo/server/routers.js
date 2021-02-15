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
        let qids = data[0];
        qids.shift()
        let qscores = data[1];
        qscores.shift();
        data.shift();
        data.shift();
        let studets_score = data;
        let studets_list = [];
        studets_list = studets_score.map((item) => {
            let student = {};
            student.name = item.shift();
            student.key = new Date()+Math.random() * 1000 + Math.random() * 1000;
            let wrongQs = item.map((q_score,index) => {
                if(q_score<qscores[index]){
                    return qids[index];
                }
            })
            student.wrongQs = wrongQs.filter((item) => {
                return item;
            })
            return student;
        })
        dbData.addStudents('students', studets_list, function(result){
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
    //获取单个学生错题列表
    getPaperList(req, res) {
        console.log(req.query._id)
        let params = {_id:req.query._id};
        dbData.getPaperList('students', params,function(result){
            res.send(result);
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
    //删除全部题目
    deleteAllExercise(req, res) {
        dbData.deleteAllExercise('exercises',function(result){
            res.send(result);
        })
    },
}

module.exports = routerFns;