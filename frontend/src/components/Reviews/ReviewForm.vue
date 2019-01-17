<template>
    <CardForm title="Submit Your Review">
      <p>
        Your feedback helps to inform others -- other students, teachers and the university.
        Please think carefully about your feedback before you submit it.
      </p>
      <span class="required">*</span>
      <AppInput placeholder="Review title..." v-model="title" style="margin:8px auto;"/><br>
      <span class="required">*</span>
      <textarea placeholder="Your review here..." v-model="body"></textarea><br>

      <OptionHeader>What session did you take the course?</OptionHeader>
      <Selector :items="sessions" v-model="session" :placeholder="'Select a session..'"/>

      <InputOptions v-model="recommend" :options="['Yes', 'No']">
        Would you recommend this course to a friend? <span class="required">*</span>
      </InputOptions>

      <InputOptions v-model="enjoy" :options="['1', '2', '3', '4', '5']">
        How much did you enjoy this course? <span class="required">*</span>
      </InputOptions>

      <InputOptions v-model="difficulty" :options="['Easy', 'Average', 'Hard']">
        How would you rate the difficulty of this course?
      </InputOptions>

      <InputOptions v-model="teaching" :options="['Poor', 'Average', 'Excellent']">
        How would you rate the teaching quality of this course?
      </InputOptions>

      <InputOptions v-model="workload" :options="['Light', 'Average', 'Heavy']">
        How would you rate the workload of this course?
      </InputOptions>

      <AppButton
        :disabled="!(recommend && enjoy && body && title && session)"
        class='submit'
        @click.native="callback({title, body, recommend, enjoy, difficulty, teaching, workload, session: sessionId})"
      >
        Submit
      </AppButton>
      <!-- errors will be injected here -->
      <slot></slot>
  </CardForm>
</template>

<script>
import AppButton from '@/components/AppButton'
import CardForm from '@/components/Card/Form'
import AppInput from '@/components/AppInput'
import InputOptions from '@/components/Reviews/ReviewOptions'
import OptionHeader from '@/components/Reviews/ReviewOptionHeader'
import Selector from '@/components/Authentication/Select'

export default {
  name: 'ReviewForm',
  components: {
    CardForm,
    AppButton,
    AppInput,
    InputOptions,
    Selector,
    OptionHeader
  },
  computed: {
    sessions() {
      return this.$store.getters.sessions.map(({ longName }) => longName)
    },
    sessionId() {
      const session = this.$store.getters.sessions
        .find(({ longName }) => longName === this.session)

      return session ? session.id : -1
    }
  },
  props: {
    callback: Function
  },
  data () {
    return {
      title: '',
      body: '',
      recommend: '',
      enjoy: '',
      difficulty: '',
      teaching: '',
      workload: '',
      session: ''
    }
  }
}
</script>

<style scoped lang='less'>

.required {
    color:red;
}

.submit {
  background-color: var(--black);
  width: 50%;
  margin: 40px 25%;
}

</style>
