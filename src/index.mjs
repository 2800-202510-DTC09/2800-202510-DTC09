import express from 'express';
import {connect, model, Schema} from 'mongoose';
import cors from 'cors';
import {join} from 'path';
import {getGlobals} from 'common-es';
import {env} from 'process';
import {serve, setup} from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const {__dirname, __filename} = getGlobals(import.meta.url);

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(join(__dirname, 'public')));
import('./api/index.mjs');

app.use(
   '/api-docs',
   serve,
   setup(
      swaggerJsdoc({
         failOnErrors: true,
         definition: {
            openapi: '3.0.0',
            info: {
               title: 'Employee API',
               description: 'Employee API Information',
               contact: {
                  name: 'Sagi Weizmann',
               },
            },
            servers: [
               {
                  url: `http://127.0.0.1:${env.PORT}/api/v1`,
               },
            ],
         },
         apis: [
            './src/api/**/*.mjs',
         ],
      }),
   ),
);

// MongoDB connection
connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/todoapp`, {
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

app.post('/todos', async (req, res) => {
   const newTodo = new Todo({
      text: req.body.text,
      completed: false,
   });
   await newTodo.save();
   res.status(201).json(newTodo);
});

app.get('/todos/:id', async (req, res) => {
   const todos = await Todo.findById(req.params.id);
   res.json(todos);
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
app.listen(env.PORT, () => {
   console.log(`Server running on http://localhost:${env.PORT}`);
});
