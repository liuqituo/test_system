const fs = require('fs');
const express = require("express");
const app = express();
const multer  = require('multer');
const path = require('path');
routerFns = require('./routers.js');

const storage = multer.diskStorage({
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

// 获取内容
// app.use("/list", require("./routers.js"));

　app.get('/getList', (req, res) => {
    　routerFns.getStudents(req, res);
 });
 //学生信息Excel上传
 app.post('/addStudentsUpload', upload.any(), (req, res) => {
    // 　routerFns.addStudentsUpload(req, res);
    console.log(req.files[0]);  // 上传的文件信息

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
                res.end( JSON.stringify( response ) );
            }
        });
    });
 });







const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});

module.exports = app;