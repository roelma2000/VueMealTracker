import express from 'express';
import { recipes } from './recipes.js';

let ingredients= [
    { name: 'Chicken Breast Halves', amount: 4, units: 'count' },
    { name: 'Pesto', amount: 0.5, units: 'cups' },
    { name: 'Prosciutto Slices', amount: 4, units: 'count' },
  ];

  
const app = express();

app.get('/',(req, res) => {
    res.send('Success!!')
});

app.get('/api/recipes',(req, res) => {
    res.json(recipes)
});

app.get('/api/ingredients',(req, res) => {
    res.json(ingredients)
});


app.listen(8000, () => console.log('server is listening in port 8000'));