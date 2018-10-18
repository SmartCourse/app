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
      <slot></slot>
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
      body: '',
      disabledMessage: {
        content: 'You must be logged in for this functionality.',
        placement: 'right'
      }
    }
  }
}
</script>

<style scoped>
h4 {
  font-weight: normal;
  margin:0 5px;
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
aside {
  /*float:right;*/
  width:24px;
  cursor: pointer;
}

aside:hover {
  color:var(--color-gray);
}
</style>
