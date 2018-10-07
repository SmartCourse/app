<template>
<div>
    <div class="ratings">
        <div v-for="rating in ratings" :key="rating.text" class="rating" >
            <Rating  :value="rating.value"/>
            <h2 class="rating-text">{{ rating && rating.text }} </h2>
        </div>

    </div>
    <div class="bar-ratings">
        <Bar v-for="rating in ratings" :rating="rating" :key="rating.text" class="bar" />
    </div>

</div>
</template>

<script>
import Rating from '@/components/AppRating/Circle'
import Bar from '@/components/AppRating/BarWithText'

export default {
  components: { Rating, Bar },
  props: {
    ratings: Array
  }
}
</script>

<style scoped>
.ratings {
  display: grid;
  grid-auto-columns: 1fr;
  grid-gap: 10px;
  width: 100%;
  min-height: 100px;
  border-bottom: var(--border);
}

.rating-text {
  margin: 0;
  font: var(--body-copy-2);
}

.rating {
  grid-row: 1;
  height: 60px;
  text-align: center;
}
</style>
