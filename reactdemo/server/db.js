let mongoose = require('mongoose');
let dbData = {
    //获取学生信息
    getStudents: function(name, callback){
        let database_name     = 'mongodb://localhost:27017/test_system';
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.find().toArray((err, result) => {
                if(err){
                    console.log('error:' + err);
                    return;
                }
                callback(result);
                db.close();
            })
        });
    },
    // 添加学生信息(Excel上传)
    addStudents: function(name, callback){
        let database_name     = 'mongodb://localhost:27017/test_system';
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.find().toArray((err, result) => {
                if(err){
                    console.log('error:' + err);
                    return;
                }
                callback(result);
                db.close();
            })
        });
    },
}

module.exports = dbData;