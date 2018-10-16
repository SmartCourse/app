<template>
    <section class="main-content">
      <AppBreadCrumb/>
      <ReviewCard v-bind="review"/>

      <ReplyForm @submitCommentForm="submitReply" :type="commentType" :callback="submitReply">
        <span class="form-failure"
            v-if="error.code">{{error.message}}</span>
      </ReplyForm>

      <transition-group name='fade' tag='ul' v-if="replies.length">
        <li v-for="answer in replies" :key="answer.id">
          <ReplyCard :comment="answer" :type="commentType" :id="id" :code="code" />
        </li>
      </transition-group>
    </section>
</template>

<script>
import ReviewCard from '@/components/Reviews/ReviewCard'
import ReplyCard from '@/components/Comments/CommentCard'
import ReplyForm from '@/components/Comments/CommentForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    ReviewCard,
    ReplyCard,
    ReplyForm
  },
  props: {
    code: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      commentType: 'Reply' // If changed, also modify CommentCards
    }
  },
  computed: {
    ...mapGetters('reviews', {
      review: 'review',
      replies: 'replies',
      loading: 'loading',
      error: 'error'
    })
  },
  methods: {
    submitReply (replyForm) {
      // check that they actually typed something
      if (replyForm.body === '') {
        // this.answerFormResponse.text = "Please type an answer!"
        // this.answerFormResponse.style = {'form-success': false, 'form-failure': true}
        return
      }
      this.$store.dispatch('reviews/postReply', { form: replyForm, code: this.code, id: this.review.id })
    }
  },
  created () {
    this.$store.dispatch('reviews/getReview', { id: this.id, code: this.code })
    this.$store.dispatch('reviews/getReplies', { id: this.id, code: this.code })
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
