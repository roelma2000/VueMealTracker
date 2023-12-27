<template>
  <div class="page">
    <div class="centered-container">
      <h1>Add Meal to Plan</h1>
      <input
        type="text"
        class="full-width space-before space-after"
        placeholder="Enter keyword here"
        v-model="searchString"
      />
      <button class="full-width space-after" @click="submitSearch">
        Search
      </button>
      <p v-if="!hasSearched">
        Enter a keyword and click "Search" to find recipes
      </p>
      <p v-if="hasSearched && searchResults.lenght === 0">
        There were no results for that keyword
      </p>
      <div
        v-for="recipe in searchResults"
        :key="recipe.id"
        class="search-list-item"
        @click="selectRecipe(recipe)"
      >
        <h3>{{ recipe.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeSearchPage',
  props: ['recipes'],
  data() {
    return {
      searchString: '',
      searchResults: [],
      hasSearched: false,
    }
  },
  methods: {
    submitSearch() {
      this.searchResults = this.recipes.filter((recipe) => {
        return recipe.name
          .toLowerCase()
          .includes(this.searchString.toLowerCase())
      })
      this.hasSearched = true
    },
    selectRecipe(recipe) {
      const date = new Date(this.$route.query.date)
      this.$emit('addMeal', { date, recipe })
      this.$router.push('/');
    },
  },
}
</script>
