<template>
    <div class="meta-fields">
      <div v-if="disabled" class="tooltip-wrapper disabled" v-tooltip="disabledMsg">
        <p class="material-icons vote disabled">keyboard_arrow_up</p>
        <p class="likes">{{ likes }}</p>
        <p class="material-icons vote disabled">keyboard_arrow_down</p>
      </div>
      <div v-else>
        <p v-on:click="upvote" class="material-icons vote">keyboard_arrow_up</p>
        <p class="likes">{{ likes }}</p>
        <p v-on:click="downvote" class="material-icons vote">keyboard_arrow_down</p>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    likes: Number,
    upvote: Function,
    downvote: Function,
    disabled: Boolean
  },
  data() {
    return {
      disabledMsg: {
        content: 'Must Login',
        placement: 'left'
      }
    }
  }
}
</script>

<style scoped>
.meta-fields {
  margin: 0 auto;
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

.disabled {
    cursor: not-allowed;
    opacity: 0.4;
    box-shadow: none;
}
</style>
