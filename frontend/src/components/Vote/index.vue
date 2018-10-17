<template>
    <BaseVote
      :likes="likes"
      :downvote="downvote"
      :aria-disabled="disabled"
      :disabled="disabled"
      :upvote="upvote"
      :class="disabled ? 'tooltip-wrapper disabled': ''"
      v-tooltip="disabledMsg"
    />
</template>

<script>
import BaseVote from './base'

export default {
  props: {
    likes: Number,
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
        content: 'You must login to rate a response',
        placement: 'left'
      }
    }
  }
}
</script>
