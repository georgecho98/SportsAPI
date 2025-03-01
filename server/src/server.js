import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import routes from './routes/index.js'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const {url} = await StartApolloServer(

  {listen:{port:3001},}

)
const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json()); 
app.use(cors({ origin: ['http://localhost:3001', 'http://127.0.0.1:5173'] }));

app.use(routes)

app.get('/', (req, res) => {
  res.send('Welcome to the Sport API ');
});

