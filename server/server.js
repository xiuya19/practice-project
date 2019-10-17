const fs = require('fs');
const express = require('express');

let app = express();
let port = 8888;
// let bodyParser = require('body-parser');
// let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/api/children', (req, res) => {
    fs.readFile(__dirname + '/data/children.json', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else {
            
            res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
            let tempData = JSON.parse(data.toString());
            let _data = {
                code: 2000,
                message: tempData
            }
            res.end(JSON.stringify(_data));
        }
    })
})

app.get('/api/itemListTitle', (req, res) => {
    fs.readFile(__dirname + '/data/itemListTitle.json', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else {
            
            res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
            let _data = JSON.parse(data.toString());
            _data.code = 2000;
            res.end(JSON.stringify(_data));
        }
    })
})

app.get('/api/itemLists', (req, res) => {
    fs.readFile(__dirname + '/data/itemLists.json', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else if(!req.query.listId) {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else {
            res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
            let tempData = JSON.parse(data.toString())[req.query.listId];
            let _data = {
                "code": 2000,
                "message": tempData
            }
            res.end(JSON.stringify(_data));
        }
    })
})

app.get('/api/itemDetail', (req, res) => {
    fs.readFile(__dirname + '/data/itemDetail.json', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else if(!req.query.itemId) {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else {
            res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
            // let tempData = JSON.parse(data.toString())[req.query.itemId];
            let tempData = JSON.parse(data.toString())[0];
            let _data = {
                "code": 2000,
                "message": tempData
            }
            res.end(JSON.stringify(_data));
        }
    })
})

app.get('/api/courseTypeList', (req, res) => {
    fs.readFile(__dirname + '/data/courseType.json', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else {
            res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
            let _data = JSON.parse(data.toString());
            _data.code = 2000;
            res.end(JSON.stringify(_data));
        }
    })
})

app.get('/api/courseList', (req, res) => {
    fs.readFile(__dirname + '/data/courseList.json', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else {
            res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
            // let tempData = JSON.parse(data.toString())[req.query.listId];
            let tempData = JSON.parse(data.toString())[0];
            let _data = {
                "code": 2000,
                "message": tempData
            }
            res.end(JSON.stringify(_data));
        }
    })
})

app.get('/api/courseDetail', (req, res) => {
    fs.readFile(__dirname + '/data/courseDetail.json', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else {
            res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
            // let tempData = JSON.parse(data.toString())[req.query.listId];
            let tempData = JSON.parse(data.toString())[0];
            let _data = {
                "code": 2000,
                "message": tempData
            }
            res.end(JSON.stringify(_data));
        }
    })
})

app.get('/api/buyInfo', (req, res) => {
    fs.readFile(__dirname + '/data/buyInfo.json', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        } else {
            res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
            // let tempData = JSON.parse(data.toString())[req.query.listId];
            let tempData = JSON.parse(data.toString());
            let _data = {
                "code": 2000,
                "message": tempData
            }
            res.end(JSON.stringify(_data));
        }
    })
})

let server = app.listen( port, () => {
    console.log('Express app server listening on port %d', port);
});
