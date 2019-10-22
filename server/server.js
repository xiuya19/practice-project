const fs = require('fs')
let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let port = 8888
// let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname))
// app.use(express.bodyParser());            //处理post请求模块
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.get('/api/parent', (req, res) => {
  fs.readFile(__dirname + '/data/parent.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
      let tempData = JSON.parse(data.toString())
      let _data = {
        code: 2000,
        message: tempData
      }
      res.end(JSON.stringify(_data))
    }
  })
})

app.get('/api/children', (req, res) => {
  fs.readFile(__dirname + '/data/children.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
      let tempData = JSON.parse(data.toString())
      let _data = {
        code: 2000,
        message: tempData
      }
      res.end(JSON.stringify(_data))
    }
  })
})

app.get('/api/itemListTitle', (req, res) => {
  fs.readFile(__dirname + '/data/itemListTitle.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
      let _data = JSON.parse(data.toString())
      _data.code = 2000
      res.end(JSON.stringify(_data))
    }
  })
})

app.get('/api/itemLists', (req, res) => {
  fs.readFile(__dirname + '/data/itemLists.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else if (!req.query.listId) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
      let tempData = JSON.parse(data.toString())[req.query.listId]
      let _data = {
        code: 2000,
        message: tempData
      }
      res.end(JSON.stringify(_data))
    }
  })
})

app.get('/api/itemDetail', (req, res) => {
  fs.readFile(__dirname + '/data/itemDetail.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else if (!req.query.itemId) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
      // let tempData = JSON.parse(data.toString())[req.query.itemId];
      let tempData;
      // console.log(req.query.itemId)
      if ( req.query.itemId < 2) {
        tempData = JSON.parse(data.toString())[req.query.itemId];
      } else {
        tempData = JSON.parse(data.toString())[0]
      }
      let _data = {
        code: 2000,
        message: tempData
      }
      res.end(JSON.stringify(_data))
    }
  })
})

app.get('/api/courseTypeList', (req, res) => {
  fs.readFile(__dirname + '/data/courseType.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
      let _data = JSON.parse(data.toString())
      _data.code = 2000
      res.end(JSON.stringify(_data))
    }
  })
})

app.get('/api/courseList', (req, res) => {
  fs.readFile(__dirname + '/data/courseList.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
      // let tempData = JSON.parse(data.toString())[req.query.courseId];
      let tempData = JSON.parse(data.toString())[0]
      let _data = {
        code: 2000,
        message: tempData
      }
      res.end(JSON.stringify(_data))
    }
  })
})

app.get('/api/courseDetail', (req, res) => {
  fs.readFile(__dirname + '/data/courseDetail.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
      // let tempData = JSON.parse(data.toString())[req.query.listId];
      let tempData = JSON.parse(data.toString())[0]
      let _data = {
        code: 2000,
        message: tempData
      }
      res.end(JSON.stringify(_data))
    }
  })
})

app.get('/api/buyInfo', (req, res) => {
  fs.readFile(__dirname + '/data/buyInfo.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
      // let tempData = JSON.parse(data.toString())[req.query.listId];
      let tempData = JSON.parse(data.toString())
      let _data = {
        code: 2000,
        message: tempData
      }
      res.end(JSON.stringify(_data))
    }
  })
})

app.post('/api/postOrder', urlencodedParser, (req, res) => {
  fs.writeFile(
    __dirname + '/data/order.json',
    JSON.stringify(req.body),
    err => {
      if (err) res.end('post failure')
      else res.end('post successfully')
    }
  )
})
app.get('/api/search', (req, res) => {
  let item = req.query
  // console.log(req.query)
  fs.readFile(__dirname + '/data/search.json', (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end()
    } else {
      let tempData1 = JSON.parse(data.toString())
      // console.log(tempData1[item.itemName])
      if (tempData1[item.itemName] !== undefined) {
        fs.readFile(__dirname + '/data/searchResult.json', (err, data) => {
          if (err) {
            console.log(err)
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
          } else {
            res.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
            let tempData2 = JSON.parse(data.toString())
            let _data = {
              code: 2000,
              message: tempData2[tempData1[item.itemName].itemId]
            }
            res.end(JSON.stringify(_data))
          }
        })
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end(JSON.stringify({
          code: 2001
        }))
      }
    }
  })
})
let server = app.listen(port, () => {
  console.log('Express app server listening on port %d', port)
})
