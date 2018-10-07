<template>
    <div class="rating" >
        <CircleRating  :value="rating.value"/>
        <h2 class="rating-text">{{ rating && rating.text }}</h2>
    </div>
</template>

<script>
import CircleRating from '@/components/AppRating/Circle'

export default {
  components: {
    CircleRating
  },
  props: {
    rating: {
      value: Number,
      text: String
    }
  }
}
</script>

<style scoped>
.rating-text {
  margin: 0;
  font: var(--body-copy-1);
}

.rating {
  grid-row: 1;
  height: 100px;
  text-align: center;
}
</style>
