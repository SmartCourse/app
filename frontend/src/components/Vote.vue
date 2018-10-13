<template>
    <div class="meta-fields">
        <p v-on:click="upvote" class="material-icons vote">keyboard_arrow_up</p>
        <p class="likes">{{ likes }}</p>
        <p v-on:click="downvote" class="material-icons vote">keyboard_arrow_down</p>
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
  color: var(--soft-black);
  font-size: 32px;
  margin: 0;
  cursor: pointer;
  user-select: none;
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

</style>
