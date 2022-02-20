// express 모듈 불러오기
const express = require('express');
const mysql = require('mysql');
const path = require('path');

// express 객체 생성
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// 데이터베이스 연결
const connection = mysql.createConnection({
    host: 'bmlx3df4ma7r1yh4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'u8chske93qphbtar',
    password: 'u74cik86q65ig2m6',
    database: 'g4qbaxkdt4mtekys',
    timezone: 'utc'
})
connection.connect();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

app.get('/api/getReserved2', (req, res) => {
    connection.query('SELECT * FROM reservation2', (err, data) => {
        res.send(data);
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`server running at http ${port}`);