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
  font-size: 40px;
  margin: 0;
  cursor: pointer;
}

.vote .likes {
    line-height: 24px;
    margin: 10px 0px;
}

.likes {
  background-color: var(--very-light-grey);
  border-radius: 100%;
  width: 40px;
  height: 40px;
  padding: 10px;
  font-size: 24px;
  line-height: 40px;
  margin: 0;
}

.vote:hover, .vote:focus {
  color: var(--black);
}

</style>
