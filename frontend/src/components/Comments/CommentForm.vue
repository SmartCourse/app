<template>
    <CardForm :title="`Submit ${type}`">
      <textarea placeholder="Your input here.." v-model="body"></textarea><br>
      <!-- should probs be a separate component -->
      <AppButton :disabled="!(authenticated)" :disabledMsg="disabledMsg" @click.native="callback({body}); body=''">
        {{ type }}
      </AppButton>
      <!-- errors will be injected here -->
      <slot></slot>
  </CardForm>
</template>

<script>
import CardForm from '@/components/Card/Form'
import AppButton from '@/components/AppButton'

export default {
  name: 'CommentForm',
  components: {
    CardForm,
    AppButton
  },
  props: {
    type: String,
    callback: Function,
    authenticated: Boolean
  },
  computed: {
    disabledMsg: function() {
      return {
        content: 'You Must Be Logged In To ' + this.type,
        placement: 'right'
      }
    }
  },
  data () {
    return {
      body: ''
    }
  }
}
</script>
