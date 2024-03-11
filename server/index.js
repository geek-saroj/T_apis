const express = require('express');
const mongoose = require('mongoose');
const Book = require('./model/usermodel.js');
const bodyParser = require('body-parser');
const cors = require('cors'); 

// Connect to MongoDB
mongoose.connect('mongodb+srv://geek:sIp70koLDGGHDEzS@mern.mghbiad.mongodb.net/?retryWrites=true&w=majority&appName=Mern', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create Express app
const app = express();
app.use(cors());

app.use(bodyParser.json());

// API to save book data
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, publishDate, description } = req.body;
    const book = new Book({ title, author, publishDate, description });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.get('/api/booksquery', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
