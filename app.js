console.log('I am on a node server');
require('dotenv').config()
const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./public/'))
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.uri;

console.log(uri);


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// function whateverNameOfIt (Params) {}
// whatever(()=>{})

app.get('/mongo', async (req,res)=>{
    console.log("in /mongo");
    await client.connect();
    console.log("connected?");
    //send a ping to confirm a successful connection
    let result = await client.db("mandys-db").collection("whatever-collection")
      .find({}).toArray();
      console.log(result);

    res.render('mongo', {
      mongoResult : result
    });

    })
    



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