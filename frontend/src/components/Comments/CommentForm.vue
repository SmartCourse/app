<template>
    <CardForm :title="`Submit ${type}`">
      <textarea placeholder="Your input here.." v-model="body"></textarea><br>
      <!-- should probs be a separate component -->
      <AppButtonToolTip v-if="!authenticated" :disabledMsg="disabledMsg">
        {{ type }}
      </AppButtonToolTip>

      <AppButton v-else @click.native="callback({body}); body=''">
        {{ type }}
      </AppButton>
      <!-- errors will be injected here -->
      <slot></slot>
  </CardForm>
</template>

<script>
import CardForm from '@/components/Card/Form'
import AppButton from '@/components/AppButton'
import AppButtonToolTip from '@/components/AppButton/WithToolTip'

export default {
  name: 'CommentForm',
  components: {
    CardForm,
    AppButton,
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
      disabledMsg: {
        content: 'You must be to logged in for this functionality.',
        placement: 'right'
      }
    }
  }
}
</script>
