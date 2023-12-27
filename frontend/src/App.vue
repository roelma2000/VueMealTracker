<template>
  <h1>Meal Tracker</h1>
  <router-view
    :ingredients="ingredients"
    :meals="meals"
    :recipes="recipes"
    @addThisIngredient="addIngredient"
    @addMeal="addMeal"
    @removeMeal="removeMeal"
  >
  </router-view>
</template>

<script>
import recipes from './fake-data'
export default {
  name: 'App',
  data() {
    return {
      ingredients: [
        { name: 'Chicken Breast Halves', amount: 4, units: 'count' },
        { name: 'Pesto', amount: 0.5, units: 'cups' },
        { name: 'Prosciutto Slices', amount: 4, units: 'count' },
      ],
      meals: [],
      recipes,
    }
  },
  methods: {
    addIngredient({ name, amount, units }) {
      this.ingredients.push({ name, amount, units })
    },
    addMeal({ date, recipe }) {
      console.log({ date, recipe })
      this.meals.push({ date, recipe })
    }, //end addMeal
    removeMeal({ date }) {
      console.error('Date:', date)

      this.meals = this.meals.filter((meal) => {
        return (
          meal.date.getFullYear() !== date.getFullYear() ||
          meal.date.getMonth() !== date.getMonth() ||
          meal.date.getDate() !== date.getDate()
        )
      })
    }, //end removeMeal
  },
  components: {},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
