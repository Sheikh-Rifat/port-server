const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

// getting cors
const cors = require("cors");

// getting dotenv files
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// database info
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyits.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// starting api calls
async function run() {
  try {
    await client.connect();

    //   database name and collections
    const database = client.db("portfolio");
    const projectsCollection = database.collection("projects");

    //   getting featured products
    app.get("/projects", async (req, res) => {
      const cursor = projectsCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
      console.log(result);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

//   testing portfolio server
app.get("/", (req, res) => {
  res.send("Portfolio server is running");
});

app.listen(port, () => {
  console.log("Portfolio server working at port", port);
});
