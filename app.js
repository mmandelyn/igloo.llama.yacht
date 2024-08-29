console.log('I am on a node server');

const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./public/'))

app.get('/', function (req, res) {
  // res.send('Hello Node from Express on Local Dev Box')
  res.sendFile('index.html');
})

app.get('/ejs', (res,req)=>{
  res.render('index',{
    myServerVariable : "something from server"
  });
  //can you get content from client to console?
})


app.listen(5000)