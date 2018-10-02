<template>
    <Card>
      <div class="content">
        <CardHeader>Submit a Review</CardHeader>
          <form>
            <p>
              Reviews are the lifeblood of SmartCourse. Your feedback helps
              to inform others -- other students, teachers and the university.
              Please think carefully about your feedback before you submit it.
            </p>
            <AppInput placeholder="Review title..." v-model="title"/><br>
            <textarea placeholder="Your review here.." v-model="body"></textarea><br>

            <InputOptions v-model="recommend" :options="['Yes', 'No', 'Unsure']">
              Would you recommend this course?
            </InputOptions>

            <InputOptions v-model="enjoy" :options="['Yes', 'No', 'Unsure']">
              Did you enjoy this course?
            </InputOptions>

            <InputOptions v-model="difficulty" :options="['Easy', 'Hard', 'Average']">
              How would you rate the difficulty of this course?
            </InputOptions>

            <AppButton type='submit' @click.native="callback({title, body, recommend, difficulty, enjoy})">Submit</AppButton>
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
      recommend: 'Yes',
      enjoy: 'Yes',
      difficulty: 'Easy'
    }
  }
}
</script>

<style scoped lang='less'>

.content {
  padding: 20px;
}

textarea {
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

button[type='submit'] {
  width: 50%;
  margin: 40px 25%;
}

</style>
