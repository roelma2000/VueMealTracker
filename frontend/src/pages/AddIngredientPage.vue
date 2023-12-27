<template>
  <div class="centered-container">
    <h1>Add Ingredient</h1>
    <input
      type="text"
      placeholder="Enter Ingredient name here"
      class="space-after space-before full-width"
      v-model="name"
    />
    <input
      type="number"
      placeholder="Enter amount name here"
      class="space-before full-width"
      v-model="amount"
    />
    <select v-model="units" class="space-before full-width">
      <option
        v-for="unitOption in unitOptions"
        :key="unitOption"
        :value="unitOption"
      >
        {{ unitOption }}
      </option>
    </select>
    <button @click="AddIngredient" class="space-before full-width">Add</button>
  </div>
</template>

<script>
export default {
  name: 'AddIngredientPage',
  props: ['ingredients'],
  data() {
    return {
      name: '',
      amount: 0,
      units: 'pounds',
      unitOptions: ['pounds', 'cups', 'tablespoons', 'count'],
    }
  },
  methods: {
    AddIngredient() {
      this.$emit('addThisIngredient', {
        name: this.name,
        amount: this.amount,
        units: this.units,
      });
      this.$router.push('/')
    },
  },
}
</script>
