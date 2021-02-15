const fs = require('fs');
const express = require("express");
const app = express();
const multer  = require('multer');
const path = require('path');
var xlsx = require('node-xlsx');
routerFns = require('./routers.js');

const storage = multer.diskStorage({// 上传文件使用缓存策略
    destination(req,res,cb){
      cb(null,'upload/');
    },
    filename(req,file,cb){
      cb(null,file.originalname);
    }
  });
  const upload = multer({storage});

// 跨域设置
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 重定向静态资源访问地址
app.use('/picture',express.static(__dirname + '/upload'));

　app.get('/getList', (req, res) => {
    　routerFns.getStudents(req, res);
 });
 //学生信息Excel上传
 app.post('/addStudentsUpload', upload.any('file'), (req, res) => {
    var des_file = "./upload/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
                var obj = xlsx.parse(des_file);//配置excel文件的路径
                var excelObj=obj[0].data;
                routerFns.addStudentsUpload(req, res,excelObj);
                // res.end( JSON.stringify( excelObj ) );
            }
        });
    });
 });
 //删除学生
　app.get('/deleteStudent', (req, res) => {
    　routerFns.deleteStudent(req, res);
    });

 //题库图片上传
 app.post('/uploadExercise', upload.any(), (req, res) => {
    // 　routerFns.addStudentsUpload(req, res);
    // console.log(req.files[0]);  // 上传的文件信息
    // console.log(req.files[0]);  // 上传的文件信息
    console.log(req.body);  // 上传的文件信息
    let params = req.body;
    var des_file = "./upload/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
                params.img = `http://localhost:3001/picture/${req.files[0].originalname}`;
                params.key = new Date()+Math.random() * 1000 + Math.random() * 1000;
                params.qid = req.files[0].originalname.split('.')[0];
                routerFns.uploadExerciseList(req, res,params);
                res.end( JSON.stringify( response ) );
            }
        });
    });
 });
//获取题库
 　app.get('/getExerciseList', (req, res) => {
    　routerFns.getExerciseList(req, res);
 });
 //删除题目
 　app.get('/deleteExercise', (req, res) => {
    　routerFns.deleteExercise(req, res);
    });
 //删除全部题目
 　app.get('/deleteAllExercise', (req, res) => {
    　routerFns.deleteAllExercise(req, res);
    });
//获取学生题目
　app.get('/getPaperList', (req, res) => {
    　routerFns.getPaperList(req, res);
 });





const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});

module.exports = app;