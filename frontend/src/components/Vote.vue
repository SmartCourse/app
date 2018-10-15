<template>
    <div class="meta-fields">
        <div v-bind:class="{ chosen: isUpvoted }">
          <p v-on:click="upvote" class="material-icons vote">keyboard_arrow_up</p>
        </div>
        <p class="likes">{{ likes }}</p>
        <div v-bind:class="{ chosen: isDownvoted }">
          <p v-on:click="downvote" class="material-icons vote">keyboard_arrow_down</p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    likes: Number,
    userLiked: Number,
    upvote: Function,
    downvote: Function
  },
  computed: {
    isUpvoted: function() {
      return this.userLiked === 1
    },
    isDownvoted: function() {
      return this.userLiked === -1
    }
  }
}
</script>

<style scoped>
.vote {
  color: var(--soft-black);
  font-size: 32px;
  margin: 0;
  cursor: pointer;
}

.vote .likes {
    line-height: 24px;
}

.likes {
  border-radius: 100%;
  width: 30px;
  height: 30px;
  padding: 10px;
  font-size: 24px;
  line-height: 30px;
  margin: 0;
}

.vote:hover, .vote:focus {
  color: var(--black);
}

.chosen {
  background-color: lightgrey
}

</style>
