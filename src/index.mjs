import express from 'express';
import {connect, model, Schema} from 'mongoose';
import cors from 'cors';
import {join} from 'path';
import {getGlobals} from 'common-es';

const {__dirname, __filename} = getGlobals(import.meta.url);

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(join(__dirname, 'public')));

// MongoDB connection
connect('mongodb://localhost:27017/todoapp', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

// Define a ToDo model
const Todo = model(
   'Todo',
   new Schema({
      text: String,
      completed: Boolean,
   }),
);

// Routes
app.get('/todos', async (req, res) => {
   const todos = await Todo.find();
   res.json(todos);
});

app.post('/todos', async (req, res) => {
   const newTodo = new Todo({
      text: req.body.text,
      completed: false,
   });
   await newTodo.save();
   res.status(201).json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
   const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   });
   res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
   await Todo.findByIdAndDelete(req.params.id);
   res.status(204).end();
});

// Start the server
app.listen(5000, () => {
   console.log('Server running on http://localhost:5000');
});
