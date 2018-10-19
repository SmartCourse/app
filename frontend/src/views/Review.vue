<template>
    <section class="main-content">
      <AppBreadCrumb/>

      <transition name="fade-slide">
        <ReviewCard v-bind="review" :authenticated="isLoggedIn" v-if="!loadingReview"/>
      </transition>

      <div style="text-align:center" v-if="loadingReview">
        <LoadingSpinner/>
      </div>

      <ReplyBar v-if="replies.length">
        <h3 style="font: var(--header-4);">{{ replies.length }} Comments</h3>
        <AppButtonToolTip
          v-if="!formToggle"
          @click.native="formToggle = true"
          :disabled="!isLoggedIn"
          :disabledMessage="tooltipMessage"
        >
          Post Comment
        </AppButtonToolTip>
      </ReplyBar>

      <ReplyForm
        @submitCommentForm="submitReply"
        :title="'Post Comment'"
        :type="commentType"
        :callback="submitReply"
        :closeCallback="replies.length ? () => formToggle = false : null"
        :authenticated="isLoggedIn"
        v-if="!loadingReplies"
        v-show="formToggle || !replies.length"
      >
        <span class="form-failure" v-if="error.code">{{error.message}}</span>
      </ReplyForm>

      <div style="text-align:center" v-else-if="!loadingReview && loadingReplies">
        <LoadingSpinner/>
      </div>

      <transition-group name='fade-slide' tag='ul' v-if="replies.length">
        <li v-for="answer in replies" :key="answer.id">
          <ReplyCard :comment="answer" :type="commentType" :id="id" :code="code" :authenticated="isLoggedIn"/>
        </li>
      </transition-group>

    </section>
</template>

<script>
import ReviewCard from '@/components/Reviews/ReviewCard'
import ReplyCard from '@/components/Comments/CommentCard'
import ReplyForm from '@/components/Comments/CommentForm'
import ReplyBar from '@/components/Comments/CommentSpacer'
import AppButtonToolTip from '@/components/AppButton/WithToolTip'
import { mapGetters } from 'vuex'

export default {
  components: {
    ReviewCard,
    ReplyCard,
    ReplyForm,
    ReplyBar,
    AppButtonToolTip
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
      commentType: 'Reply', // If changed, also modify CommentCards
      formToggle: false
    }
  },
  computed: {
    ...mapGetters('reviews', {
      review: 'review',
      replies: 'replies',
      loadingReview: 'loadingReview',
      loadingReplies: 'loadingReplies',
      error: 'error'
    }),
    ...mapGetters('auth', ['isLoggedIn']),
    tooltipMessage() {
      return {
        content: this.isLoggedIn ? '' : 'You must be logged in to comment.',
        placement: 'right'
      }
    }
  },
  methods: {
    submitReply (replyForm) {
      if (!this.isLoggedIn) {
        this.$router.push('/login')
        return
      }
      // check that they actually typed something
      if (replyForm.body === '') {
        // this.answerFormResponse.text = "Please type an answer!"
        // this.answerFormResponse.style = {'form-success': false, 'form-failure': true}
        return
      }
      this.$store.dispatch('reviews/postReply', { form: replyForm, code: this.code, id: this.review.id })
      // toggle the form if no error occurred
        .then(() => {
          if (!this.error.message) this.formToggle = !this.formToggle
        })
    }
  },
  created () {
    this.$store.dispatch('reviews/getReview', { id: this.id, code: this.code })
    this.$store.dispatch('reviews/getReplies', { id: this.id, code: this.code })
  }
}
</script>
