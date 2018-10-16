<template>
    <CardForm title="Submit Your Question">
      <AppInput v-model="title" placeholder="Question title" />
      <textarea placeholder="Your question here.." v-model="body"></textarea><br>
      <AppButton @click.native="callback({title, body})">Ask</AppButton>
      <!-- errors will be injected here -->
      <slot></slot>
    </CardForm>
</template>

<script>
import CardForm from '@/components/Card/Form'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'

export default {
  name: 'QuestionForm',
  components: {
    CardForm,
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
