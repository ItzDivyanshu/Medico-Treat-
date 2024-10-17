const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Atlas connection string
const uri = 'mongodb+srv://divyanshu21cse:yrqMTCzDRA0bqv1Y@medic.zhzrg14.mongodb.net/?retryWrites=true&w=majority&appName=Medic';
let db;

// Connect to MongoDB Atlas
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB Atlas");
    db = client.db('Medic');  // Update database name to match your MongoDB Atlas cluster

    // Start the server after the DB connection is established
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error("Failed to connect to MongoDB Atlas", error);
    process.exit(1);  // Exit the process with an error code
  });

// Serve the HTML form
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'treatment.html');
  res.sendFile(filePath);
});

// Endpoint to handle form submissions
app.post('/data', async (req, res) => {
  try {
    const collection = db.collection('formData');  // Update collection name to match your actual collection name
    const result = await collection.insertOne(req.body);
    res.json(result);
  } catch (error) {
    console.error("Failed to insert document into MongoDB", error);
    res.status(500).send(error);
  }
});
