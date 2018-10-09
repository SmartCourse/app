<template>
  <Card class="feed-card">
    <div class="header">
      <h3>{{  'A fun course!'/* title */ }}</h3><p>{{ published }}</p>
    </div>
     <div class="meta">
       <p><i class="material-icons">account</i>Jeff Goldblum</p>
    </div>
    
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  props: {
    title: String,
    likes: Number,
    published: String,
    author: Number
  },
  components: {
    Card
  }
}
</script>

<style scoped>
.header {
  border-bottom: var(--border);
}

h3 {
  display: inline-block;
  margin: 10px 0;
  font: var(--header-3);
  font-weight: bolder;
}

p {
  display: inline;
  font: var(--body-copy-1);
}

</style>


