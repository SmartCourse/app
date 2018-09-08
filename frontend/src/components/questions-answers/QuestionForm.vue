<template>
    <Card>
      <div class="content">
          <h3>Submit a Question</h3>
          <p>
            <textarea placeholder="Your question here.." v-model="body"></textarea><br>
            <!-- should probs be a separate component -->
            <AppButton @click.native="$emit('submitQuestionForm', {body})">Ask</AppButton>
            <!-- errors will be injected here -->
            <slot></slot>
          </p>
      </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import AppButton from '@/components/AppButton'

export default {
  name: 'QuestionForm',
  components: {
    Card,
    AppButton
  },
  data () {
    return {
      body: ''
    }
  }
}
</script>

<style scoped lang='less'>

.content {
  padding: 0px 60px;
}

textarea {
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 5px;
  outline: none;
  margin: 10px 0px;
  width: 100%;
  height: 100px;
  transition: 0.2s border ease-in-out;
}

textarea:focus, textarea:active {
  border: 1px solid #acc;
}
</style>
