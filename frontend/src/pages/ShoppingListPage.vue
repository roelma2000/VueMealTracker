<template>
  <div class="page">
    <div class="centered-container">
      <h1>Here's your shopping list:</h1>
      <p v-for="item in shoppingListItems" :key="item">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingListPage',
  data() {
    return {
      shoppingListItems: [
        '3 cups of flour',
        '5 tablespoon of honey',
        '2 lbs of chicken',
      ],
    }
  }, //end data
}
</script>
