<template>
<div>
  <div v-if="rating && rating.value >= 0" class="rating" >
      <CircleRating  :value="rating.value"/>
      <h2 class="rating-text">{{ rating && rating.text }}</h2>
  </div>
  <div v-else class="rating no-review">
    <p class="material-icons">error</p>
    <p>This course has not been reviewed yet.</p>
  </div>
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

.no-review {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.no-review > p {
  margin: 0;
}

.rating {
  grid-row: 1;
  height: 100px;
  text-align: center;
}
</style>
