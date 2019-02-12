<template>
    <div class="meta-fields">
        <p v-on:click="upvote" :class="[userLiked === 1 ? 'voted' : '', 'material-icons vote']">keyboard_arrow_up</p>
        <p class="likes">{{ likes }}</p>
        <p v-on:click="downvote" :class="[userLiked === -1 ? 'voted' : '','material-icons vote']">keyboard_arrow_down</p>
    </div>
</template>

<script>
export default {
  props: {
    likes: Number,
    userLiked: Number,
    upvote: Function,
    downvote: Function
  }
}
</script>

<style scoped>
.meta-fields {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vote {
  color: var(--soft-black);
  font-size: 32px;
  margin: 0;
  cursor: pointer;
  user-select: none;
}

.vote .likes {
    line-height: 20px;
}

.likes {
  border-radius: 100%;
  width: 32px;
  height: 32px;
  font-size: 20px;
  line-height: 32px;
  margin: 0;
  text-align: center;
}

.vote:hover, .vote:focus {
  color: var(--black);
}

.voted {
  color: var(--theme-light);
}

.tooltip-wrapper .vote:hover,
.tooltip-wrapper .vote:focus {
  color: var(--soft-black);
  cursor: help;
}

.disabled {
    opacity: 0.4;
}
</style>
