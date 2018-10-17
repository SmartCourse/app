<template>
    <CardForm :title="`Submit ${type}`">
      <textarea placeholder="Your input here.." v-model="body"></textarea><br>
      <!-- should probs be a separate component -->
      <AppButtonToolTip 
        @click.native="callback({body}); body='';" 
        :disabled="!authenticated" 
        :disabledMessage="disabledMessage">
        {{ type }}
      </AppButtonToolTip>
      <!-- errors will be injected here -->
      <slot></slot>
  </CardForm>
</template>

<script>
import CardForm from '@/components/Card/Form'
import AppButtonToolTip from '@/components/AppButton/WithToolTip'

export default {
  name: 'CommentForm',
  components: {
    CardForm,
    AppButtonToolTip
  },
  props: {
    type: String,
    callback: Function,
    authenticated: Boolean
  },
  data () {
    return {
      body: '',
      disabledMessage: {
        content: 'You must be to logged in for this functionality.',
        placement: 'right'
      }
    }
  }
}
</script>
