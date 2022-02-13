// express 모듈 불러오기
const express = require('express');
const path = require('path');

// express 객체 생성
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`server running at http ${port}`);