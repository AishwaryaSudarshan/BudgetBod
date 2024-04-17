import express from 'express';
import cors from 'cors';
import { recipes } from './recipes.js';  // Adjust path as necessary

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
