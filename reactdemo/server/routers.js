const express = require('express')
const dbData=require('./db.js');



let routerFns =  {
    getStudents(req, res, callback) {
        dbData.getStudents('students', function(result){
            res.send(result);
            callback && callback();
        })
    },
    addStudentsUpload(req, res, data,callback) {
        dbData.addStudents('students', data, function(result){
            res.send(result);
            callback && callback();
        })
    },
}

module.exports = routerFns;