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
            collection.insertMany(data).then(() => {
                callback && callback('学生插入成功');
                db.close();
            })
        });
        
    },
    // 删除学生信息(Excel上传)
    deleteStudent: function(name, data,callback){
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            console.log(data)
            collection.deleteOne(data).then(() => {
                callback && callback('学生删除成功');
                db.close();
            });
        });
    
        
    },
    //获取学生信息
    getExerciseList: function(name, callback){
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
    // 添加题库
    uploadExercise: function(name, data,callback){
        let before_q = {qid:data.qid};
        console.log(before_q)
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.deleteOne(before_q);
            collection.insertOne(data).then(() => {
                callback && callback();
                db.close();
            })
        });
        
    },
    // 删除题库信息(Excel上传)
    deleteExercise: function(name, data,callback){
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.deleteOne(data).then(() => {
                callback && callback('题目删除成功');
                db.close();
            });
        });
    },
    // 删除全部题库信息(Excel上传)
    deleteAllExercise: function(name,callback){
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.remove().then(() => {
                callback && callback('题目删除成功');
                db.close();
            });
        });
    },
}

module.exports = dbData;