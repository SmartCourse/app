<template>
    <Card>
      <div class="content">
        <CardHeader>Submit a Review</CardHeader>
          <form>
            <AppInput placeholder="Review title..." v-model="title"/><br>
            <textarea placeholder="Your review here.." v-model="body"></textarea><br>
            <!-- should probs be a separate component -->
            <AppButton @click.native="callback({title, body})">Submit</AppButton>
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
  name: 'ReviewForm',
  components: {
    Card,
    CardHeader,
    AppButton,
    AppInput
  },
  props: {
    callback: Function
  },
  data () {
    return {
      title: '',
      body: ''
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
</style>
