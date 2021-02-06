const express = require('express')
const router = express()
const dbData=require('./db.js');

router.get('/', (req, res, next) => {
    dbData.selectall('students', function(result){
        console.log(result, 111111)
        res.send(result);
    })
})

module.exports = router