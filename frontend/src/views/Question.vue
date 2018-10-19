  <template>
    <section class="main-content">
      <AppBreadCrumb/>

      <transition name="fade-slide">
        <QuestionCard v-bind="question" :authenticated="isLoggedIn" v-if="!loadingQuestion" />
      </transition>
      <div style="text-align:center" v-if="loadingQuestion">
        <LoadingSpinner/>
      </div>

      <AnswerBar v-if="answers.length">
        <h3 style="font: var(--header-4);">{{ answers.length }} Answers</h3>
        <AppButtonToolTip
          v-if="!formToggle"
          @click.native="formToggle = true"
          :disabled="!isLoggedIn"
          :disabledMessage="tooltipMessage"
        >
          Post Answer
        </AppButtonToolTip>
      </AnswerBar>

      <AnswerForm
        @submitCommentForm="submitAnswer"
        :title="'Post Answer'"
        :type="commentType"
        :callback="submitAnswer"
        :closeCallback="answers.length ? () => formToggle = false : null"
        :authenticated="isLoggedIn"
        v-if="!loadingAnswers"
        v-show="formToggle || !answers.length"
      >
        <span class="form-failure" v-if="error.code">{{error.message}}</span>
      </AnswerForm>

      <div style="text-align:center" v-if="!loadingQuestion && loadingAnswers">
        <LoadingSpinner/>
      </div>

      <transition-group name='fade-slide' tag='ul' v-if="answers.length">
        <li v-for="answer in answers" :key="answer.id">
          <AnswerCard :comment="answer" :type="commentType" :id="id" :code="code" :authenticated="isLoggedIn"/>
        </li>
      </transition-group>

    </section>
</template>

<script>
import QuestionCard from '@/components/Questions/QuestionCard'
import AnswerCard from '@/components/Comments/CommentCard'
import AnswerForm from '@/components/Comments/CommentForm'
import AnswerBar from '@/components/Comments/CommentSpacer'
import AppButtonToolTip from '@/components/AppButton/WithToolTip'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionCard,
    AnswerCard,
    AnswerForm,
    AnswerBar,
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
      commentType: 'Answer', // If changed, also modify CommentCards
      formToggle: false
    }
  },
  computed: {
    ...mapGetters('questions', {
      question: 'question',
      answers: 'answers',
      loadingAnswers: 'loadingAnswers',
      loadingQuestion: 'loadingQuestion',
      error: 'error'
    }),
    ...mapGetters('auth', ['isLoggedIn']),
    tooltipMessage() {
      return {
        content: this.isLoggedIn ? '' : 'You must be logged in to answer.',
        placement: 'right'
      }
    }
  },
  methods: {
    submitAnswer (answerForm) {
      if (!this.isLoggedIn) {
        this.$router.push('/login')
        return
      }
      // check that they actually typed something
      if (answerForm.body === '') {
        return
        // this.answerFormResponse.text = "Please type an answer!"
        // this.answerFormResponse.style = {'form-success': false, 'form-failure': true}
      }
      this.$store.dispatch('questions/postAnswer', { form: answerForm, code: this.code, id: this.question.id })
      // toggle the form if no error occurred
        .then(() => {
          if (!this.error.message) this.formToggle = !this.formToggle
        })
    }
  },
  created () {
    this.$store.dispatch('questions/getAnswers', { id: this.id, code: this.code })
    this.$store.dispatch('questions/getQuestion', { id: this.id, code: this.code })
  }
}
</script>
