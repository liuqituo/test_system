const express = require("express");
const app = express();

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
app.use("/list", require("./routers.js"));

　app.get('/', (req, res) => {
    　　  res.send('api');
 });

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});

module.exports = app;