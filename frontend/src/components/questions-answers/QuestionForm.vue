<template>
    <Card>
      <div class="content">
          <h3>Submit a Question</h3>
          <p>
            <input type="text" placeholder="Question title..." v-model="title"><br>
            <textarea placeholder="Your question here.." v-model="body"></textarea><br>
            <AppButton @click.native="callback({title, body})">Ask</AppButton>
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
  padding: 0px 60px;
}

input[type=text] {
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 10px;
  outline: none;
  margin: 10px 0px;
  width: 100%;
  height: 20px;
  transition: 0.2s border ease-in-out;
}

textarea {
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 10px;
  outline: none;
  margin: 10px 0px;
  width: 100%;
  height: 100px;
  transition: 0.2s border ease-in-out;
}

input:active, textarea:focus, input:focus, textarea:active {
  border: 1px solid #acc;
}
</style>
