<template>
    <Card>
        <div class="meta-fields">
        </div>
        <div class="content">
            <h3>Submit an Answer</h3>
            <p>
              <input type=text v-model="formdata.title" /><br>
              <textarea v-model="formdata.body"></textarea><br>
              <button @click="$emit('submitAnswerForm', {title:formdata.title, body:formdata.body})">Answer</button><br>
              <slot></slot>
            </p>
        </div>
  </Card>
</template>

<script>
import Card from './Card'

export default {
  name: 'AnswerForm',
  components: {
      Card
  },
  data: function () {
          return {
            formdata: {
              title:'',
              body:''
            }
          }
  }
}
</script>

<style scoped>
  textarea {
    width: 100%;
    height: 100px;
  }
</style>

