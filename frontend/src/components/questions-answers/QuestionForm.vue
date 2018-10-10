<template>
    <Card>
      <div class="content">
          <CardHeader>Submit Your Question</CardHeader>
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
</style>
