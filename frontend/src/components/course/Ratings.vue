<template>
    <div class="ratings">
        <div v-for="rating in ratings" :key="rating.text" class="rating" >
            <Rating  :value="rating.value"/>
            <h2 class="rating-text">{{ rating && rating.text }} </h2>
        </div>
    </div>
</template>

<script>
import Rating from '@/components/AppRatingCircle'

export default {
  components: { Rating },
  props: {
    ratings: Array
  }
}
</script>

<style scoped>
.ratings {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    overflow-x: scroll;
    min-height: 120px;
    border-bottom: var(--border);
}

.rating-text {
    margin: 0;
    font: var(--body-copy-1);
}

.rating {
    /* grid-row: 1; */
    height: 80px;
    text-align: center;
}
</style>
