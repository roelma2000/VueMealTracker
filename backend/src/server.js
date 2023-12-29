import express from 'express';
import { recipes } from './recipes.js';
import {v4 as uuid} from 'uuid';
import {generateShoppingList} from './generateShoppingList.js'

let ingredients= [
    { name: 'Chicken Breast Halves', amount: 4, units: 'count' },
    { name: 'Pesto', amount: 0.5, units: 'cups' },
    { name: 'Prosciutto Slices', amount: 4, units: 'count' },
  ];

let meals = [
    { id: '1234', date: new Date(), recipeId: '123' },
    { id: '1234', date: new Date(), recipeId: '345' },
    { id: '1234', date: new Date(), recipeId: '567' },
];

const populatedMeals = meals.map(meal => {
    const recipeForMeal = recipes.find(recipe => recipe.id === meal.recipeId);
    return {
        ...meal,
        recipe: recipeForMeal,
    };
});

console.log(generateShoppingList(populatedMeals, ingredients));
  
const app = express();

app.use(express.json());

app.get('/',(req, res) => {
    res.send('Success!!')
});

// app.get('/api/recipes',(req, res) => {
//     res.json(recipes)
// });
app.get('/api/recipes',(req, res) => {
    const {search} = req.query;
    const matchingRecipies = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(search) || recipe.ingredients.some(ingredient => {
            return ingredient.name.toLowerCase().includes(search)
        });
    })
    res.json(matchingRecipies);
});

app.get('/api/ingredients',(req, res) => {
    res.json(ingredients)
});

app.get('/api/meals',(req, res) => {
    const populatedMeals = meals.map(meal => {
        const recipeForMeal = recipes.find(recipe =>  recipe.id === meal.recipeId);
        return {
            ...meal,
            recipe: recipeForMeal,
        }
    });
    res.json(populatedMeals)
});

app.post('/api/ingredients',(req, res) => {
     const {name, amount, units} = req.body;
     ingredients.push({name, amount, units});
    res.json(ingredients)
});

app.post('/api/meals',(req, res) => {
    const {date, recipeId} = req.body;
    meals.push({id: uuid(),date: new Date(date),recipeId});
    res.json(meals)
});

app.put('/api/ingredients/:name', (req,res) => {
    const {name: ingredientName} =  req.params;
    const {name, amount, units} = req.body;

    const ingredient = ingredients.find(ingredient => ingredient.name ===ingredientName );

    ingredient.name = name || ingredient.name;
    ingredient.amount = amount || ingredient.amount;
    ingredient.units = units || ingredient.units;
    res.json(ingredients); 
});

app.put('/api/meals/:id', (req,res) => {
    const {id: mealId} =  req.params;
    const {id, date, recipeId} = req.body;

    const meal = meals.find(meal => meal.id === mealId );

    meal.date = (date && new Date(date)) || meal.date;
    meal.recipeId = recipeId || meal.recipeId;

    res.json(meals); 
});

app.delete('/api/ingredients/:name', (req,res) => {
    const {name} =  req.params;
    ingredients = ingredients.filter(ingredient=> ingredient.name !== name); //filter since no DB yet
    res.json(ingredients); 
});

app.delete('/api/meals/:id', (req,res) => {
    const {id: mealId} =  req.params;
    meals = meals.filter(meal => meal.id!==mealId);
    res.json(meals);
});



app.listen(8000, () => console.log('server is listening in port 8000'));