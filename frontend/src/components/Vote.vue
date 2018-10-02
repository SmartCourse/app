<template>
    <div class="meta-fields">
        <p v-on:click="upvote" class="vote">&plus;</p>
        <p class="likes">{{ likes }}</p>
        <p v-on:click="downvote" class="vote">&minus;</p>
    </div>
</template>

<script>
export default {
  props: {
    likes: Number,
    upvote: Function,
    downvote: Function
  }
}
</script>

<style scoped>
.vote {
  font-size: 40px;
  margin: 0;
  font-weight: bold;
  cursor: pointer;
}

.likes {
  font-size: 24px;
  margin: 0;
}

.vote:first-of-type {
  color: rgba(48, 179, 48, 0.637);
}

.vote:last-of-type {
  color: rgba(224, 79, 79, 0.74);
}

.vote .likes {
    line-height: 24px;
    margin: 10px 0px;
}
</style>
