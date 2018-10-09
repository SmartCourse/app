<template>
  <Card class="feed-card">
    <div class="rating" :title="`${likes} people found this helfpul`">
      {{ Math.floor(Math.random() * 10) /* should be likes */}}
    </div>
    <div class="info">
      <div class="header">
        <h3>{{ title }}</h3><p><time>{{ published }}</time></p>
      </div>
      <div class="meta">
        <p class="positive"><b>Recommended</b></p>
        <p>Jeff Goldblum (B. Comp Sci)</p>
      </div>
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
.feed-card {
  min-width: 310px;
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 10px;
}

.header, .meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.rating {
  padding: 10px;
  background-color: #aaa;
  color: white;
  margin: 5px 0;
  width: 20px;
  height:20px;
  line-height: 20px;
  text-align: center;
  border-radius: 100%;
}

.positive {
  color: green;
}

h3 {
  display: inline-block;
  margin: 10px 0;
  font: var(--header-4);
  font-weight: bolder;
}

p, h3 {
  margin: 0;
}

p {
  display: inline;
  font: var(--body-copy-2);
}

</style>


