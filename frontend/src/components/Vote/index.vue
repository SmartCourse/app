<template>
    <BaseVote
      :likes="likes"
      :downvote="disabled ? () => {} : downvote"
      :aria-disabled="disabled"
      :disabled="disabled"
      :upvote="disabled ? () => {} : upvote"
      :title="disabledMsg.content"
      :userLiked="userLiked"
      :class="disabled ? 'tooltip-wrapper disabled': ''"
    />
</template>

<script>
import BaseVote from './base'

export default {
  props: {
    likes: Number,
    userLiked: Number,
    upvote: Function,
    downvote: Function,
    disabled: Boolean
  },
  components: {
    BaseVote
  },
  data() {
    return {
      disabledMsg: {
        content: 'You must login to vote',
        placement: 'left'
      }
    }
  }
}
</script>
