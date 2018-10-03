<template>
    <Card>
      <div class="content">
        <CardHeader>Submit Your Review</CardHeader>
          <form>
            <p>
              Reviews are the lifeblood of SmartCourse. Your feedback helps
              to inform others -- other students, teachers and the university.
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

            <AppButton :disabled="!(recommend && enjoy && body && title)" class='submit' @click.native="callback({title, body, recommend, enjoy, difficulty, teaching, workload})">Submit</AppButton>
            <!-- errors will be injected here -->
            <slot></slot>
          </form>
      </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import CardHeader from '@/components/Card/Header'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import InputOptions from '@/components/reviews-replies/ReviewOptions'

export default {
  name: 'ReviewForm',
  components: {
    Card,
    CardHeader,
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

.content {
  padding: 20px;
}

textarea {
  display:inline;
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 10px;
  outline: none;
  margin: 10px 0px;
  width: calc(100% - 20px);
  height: 100px;
  transition: 0.2s border ease-in-out;
}

textarea:focus, textarea:active {
  border: 1px solid #acc;
}

.submit {
  background-color: var(--black);
  width: 50%;
  margin: 40px 25%;
}

</style>
