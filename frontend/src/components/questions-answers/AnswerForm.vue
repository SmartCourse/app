<template>
    <Card>
      <div class="content">
          <h3>Submit an Answer</h3>
          <p>
            <textarea v-model="body"></textarea><br>
            <button class="standard-button" @click="$emit('submitAnswerForm', {body})">Answer</button><br>
            <!-- errors will be injected here -->
            <slot></slot>
          </p>
      </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'AnswerForm',
  components: {
    Card
  },
  data () {
    return {
      body: ''
    }
  }
}
</script>

<style scoped lang='less'>
@import '../../css/button';

.content {
  padding: 0px 60px;
}

textarea {
  border: var(--border);
  font: inherit;
  resize: none;
  margin: 10px 0px;
  width: 100%;
  height: 100px;
}
</style>
