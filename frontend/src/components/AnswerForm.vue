<template>
  <div class="card">
    <h3>Submit an Answer</h3>
    <span>Title</span><input type=text v-model="formdata.title" />
    <textarea v-model="formdata.body"></textarea>
    <div>
    {{ formdata.title }}
    {{ formdata.body }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'AnswerForm',
    data: function () {
        return {
          formdata: {
            title:'',
            body:''
          }
      }
    },
  props: {}
}
</script>

