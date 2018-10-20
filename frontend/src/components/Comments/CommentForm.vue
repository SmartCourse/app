<template>
    <Card>
      <div class="title-container">
        <h4>{{ title }}</h4>
        <aside v-if="closeCallback" v-on:click="closeCallback"><i class="material-icons">close_circle</i></aside>
      </div>
      <textarea placeholder="" v-model="body"></textarea><br>
      <!-- should probs be a separate component -->
      <AppButtonToolTip
        @click.native="callback({body}); body='';"
        :disabled="!authenticated"
        :disabledMessage="disabledMessage">
        Submit
      </AppButtonToolTip>
      <!-- errors will be injected here -->
      <slot/>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import AppButtonToolTip from '@/components/AppButton/WithToolTip'

export default {
  name: 'CommentForm',
  components: {
    Card,
    AppButtonToolTip
  },
  props: {
    type: String,
    title: String,
    callback: Function,
    authenticated: Boolean,
    closeCallback: Function
  },
  data () {
    return {
      body: ''
    }
  },
  computed: {
    disabledMessage () {
      return {
        content: this.authenticated ? '' : 'You must be logged in to post.',
        placement: 'right'
      }
    }
  }
}
</script>

<style scoped>
h4 {
  font: var(--body-copy-1);
  margin:0 7px;
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
aside {
  width:24px;
  cursor: pointer;
}
aside:hover {
  color:var(--color-gray);
}
</style>
