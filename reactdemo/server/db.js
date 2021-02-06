let dbData = {
    selectall: function(name, callback){
        let mongoose = require('mongoose');
        let database_name     = 'mongodb://localhost:27017/test_system';
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.find({name:'Qituo.Liu'}).toArray((err, result) => {
                if(err){
                    console.log('error:' + err);
                    return;
                }
                callback(result);
                db.close();
            })
        });
    }
}

module.exports = dbData;