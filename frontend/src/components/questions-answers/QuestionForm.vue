<template>
    <Card>
      <div class="content">
          <CardHeader>Submit a Question</CardHeader>
          <form>
            <AppInput v-model="title" placeholder="Question title" />
            <textarea placeholder="Your question here.." v-model="body"></textarea><br>
            <AppButton @click.native="callback({title, body})">Ask</AppButton>
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

export default {
  name: 'QuestionForm',
  components: {
    Card,
    CardHeader,
    AppButton,
    AppInput
  },
  data () {
    return {
      title: '',
      body: ''
    }
  },
  props: {
    callback: Function
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
</style>
