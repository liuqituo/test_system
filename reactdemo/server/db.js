let mongoose = require('mongoose');
let database_name     = 'mongodb://localhost:27017/test_system';
let dbData = {
    //获取学生信息
    getStudents: function(name, callback){
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.find().toArray((err, result) => {
                if(err){
                    console.log('error:' + err);
                    return;
                }
                callback && callback(result);
                db.close();
            })
        });
    },
    // 添加学生信息(Excel上传)
    addStudents: function(name, data,callback){
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.remove().then(() => {

            });
            let InsettList = data.map((item) => {
                return {name: item[1], age: item[2],tag:item[3],address:item[4],key:item[0]};
            })
            collection.insertMany(InsettList).then(() => {
                callback && callback('学生插入成功');
                db.close();
            })
        });
        
    },
}

module.exports = dbData;