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
        :disabled="!(recommend && enjoy && body && title)"
        class='submit'
        @click.native="callback({title, body, recommend, enjoy, difficulty, teaching, workload})"
      >
        Submit
      </AppButton>
      <!-- errors will be injected here -->
      <slot></slot>
  </CardForm>
</template>

<script>
import CardForm from '@/components/Card/Form'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import InputOptions from '@/components/Reviews/ReviewOptions'

export default {
  name: 'ReviewForm',
  components: {
    CardForm,
    AppButton,
    AppInput,
    InputOptions
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
      workload: ''
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
