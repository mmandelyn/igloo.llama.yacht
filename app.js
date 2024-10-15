console.log('I am on a node server');

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const PORT = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://Mandy:${process.env.MONGO_PWD}@cluster0.ru7jq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0$`;

app.set('view engine', 'ejs')
app.use(express.static('./public/'))
app.use(bodyParser.urlencoded({ extended: true }))

console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


app.get('/', async function (req, res) {
  
  console.log('in /');
  await client.connect();

  console.log('should be connected');
  //send a ping to confirm a succesful connection
  
  let result = await client.db("mandys-db").collection("whatever-collection").find({}).toArray();
  // console.log(result);

  res.render('index', {
    postData: result });
  
  
})


// app.get('/ejs', (res,req)=>{
//   res.render('.index',{
//     myServerVariable : "something from server"
//   });
// })

// app.get('/read', async(req,res)=>{
// put read into /
//   })


app.post('/insert', async(req,res)=>{

  console.log('in /insert');

  //connect to db,
  await client.connect();
  //point to collection
  await client.db("mandys-db").collection("whatever-collection").insertOne({fname: req.body.fname});

  //insert into it
  res.redirect('/');
})

app.post('/update', async (req,res)=>{

  console.log("req.body: ", req.body)

  client.connect; 
  const collection = client.db("mandys-db").collection("whatever-collection");
  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.body.nameID)}, { $set: {"fname": req.body.inputUpdateName } }
)
.then(result => {
  console.log(result);
  res.redirect('/');
})
}); 

app.post('/delete/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("mandys-db").collection("whatever-collection");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)}).then(result => {
    console.log(result);
    res.redirect('/');})

});

//app.listen(5000)

app.listen(PORT, () =>{
  console.log(`Server is running & listening on port ${PORT}`);
});