<template>
    <div class="ratings">
        <Rating v-for="rating in ratings" class="rating" :text="rating.text" :key="rating.text" :value="rating.value"/>
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
    justify-content: flex-start;
    height: 100px;
    transform: translateX(-10px);
}

.rating {
    height: inherit;
}
</style>
