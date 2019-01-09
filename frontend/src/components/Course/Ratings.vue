<template>
  <div class="ratings">
    <Bar v-for="rating in ratings" :rating="rating" :key="rating.text" class="bar" />
  </div>
</template>

<script>
import Bar from '@/components/AppRating/BarWithText'

export default {
  components: { Bar },
  props: {
    ratings: Array
  }
}
</script>

<style scoped>
.ratings {
  padding: 10px 0;
}
</style>
