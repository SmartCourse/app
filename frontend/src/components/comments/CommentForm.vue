<template>
    <Card>
      <div class="content">
          <CardHeader>Submit {{ type }}</CardHeader>
          <form>
            <textarea placeholder="Your input here.." v-model="body"></textarea><br>
            <!-- should probs be a separate component -->
            <AppButton @click.native="callback({body}); body=''">{{ type }}</AppButton>
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

export default {
  name: 'CommentForm',
  components: {
    Card,
    AppButton,
    CardHeader
  },
  props: {
    type: String,
    callback: Function
  },
  data () {
    return {
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
  padding: 5px;
  outline: none;
  margin: 10px 0px;
  width: 100%;
  height: 100px;
  transition: 0.2s border ease-in-out;
}

textarea:focus, textarea:active {
  border: 1px solid #acc;
}

@media screen and (max-width: 450px) {
  .content {
    width: 95%;
    padding: 0px;
  }
}
</style>
