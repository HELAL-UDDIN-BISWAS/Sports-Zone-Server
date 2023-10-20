const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
// o5rxo2K0vtVL2HUa
// Assignment-10-Server
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=START MONGODB=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const uri = "mongodb+srv://Assignment-10-Server:o5rxo2K0vtVL2HUa@cluster0.dhtqvw7.mongodb.net/?retryWrites=true&w=majority";
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
    const database = client.db("CategoriesDB");
    const InsertCategories = database.collection("Categorie");

    app.get('/categories', async (req, res) => {
      const cursor = InsertCategories.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/categories/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await InsertCategories.findOne(query)
      res.send(result)
    })

    app.post('/categories', async (req, res) => {
      const categorie = req.body
      console.log(categorie)
      const result = await InsertCategories.insertOne(categorie)
      res.send(result)
    })
    app.put('/categories/:id', async(req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedProdect=req.body
      const updated = {
        $set: {
          name: updatedProdect.name,
          BraNdname: updatedProdect.BraNdname,
          imageurl: updatedProdect.imageurl,
          Type: updatedProdect.Type,
          ShortDescription: updatedProdect.ShortDescription,
          Rating: updatedProdect.Rating, Price: updatedProdect.Price
        }
      }
      const result=await InsertCategories.updateOne(filter,updated,options);
      res.send(result)
    })
    app.delete('/categories/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await InsertCategories.deleteOne(query)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=END MONGODB=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


app.get('/', (req, res) => {
  res.send('Hello World')
})
app.listen(port, () => {
  console.log("Assignment-10-Server")
})