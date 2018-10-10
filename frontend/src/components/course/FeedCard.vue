<template>
  <Card class="feed-card">
    <div class="user">
      <div class="letter rating">
        {{ ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map((l) => l.toUpperCase())[Math.floor(Math.random() * 26)] /* should be likes */}}
      </div>
    </div>
    <div class="info">
      <router-link tag="div" class="header" :to="{ name: 'review', params: { code, id }}">
        <h3 class="header-title">{{ title }}</h3>
      </router-link>
      <p class="published">
        <time>{{ published }}</time>
      </p>
      <p :class="positiveOrNegativeClass">
        <b>{{ positiveOrNegativeText }}</b>
      </p>
      <p class="likes">{{ likes || 0 }} users found this helpful</p>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'

const randomNumber = Math.random()

export default {
  props: {
    title: String,
    likes: Number,
    published: String,
    author: Number,
    code: String,
    id: String
  },
  components: {
    Card
  },
  computed: {
    /* TODO use recommendation */
    positiveOrNegativeText() {
      return randomNumber > 0.5 ? 'Recommended' : 'Not Recommended'
    },
    positiveOrNegativeClass() {
      return randomNumber > 0.5 ? 'positive' : 'negative'
    }
  },
  mounted() {
    console.log(this.props)
  }
}
</script>

<style scoped>

.feed-card {
  border-radius: 0;
  min-width: 310px;
  display: grid;
  grid-template-columns: 50px 1fr;
  margin: 0;
  grid-gap: 10px;
}

.info {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 200px;
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
}

.published, .likes {
  text-align: right;
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
  color:rgba(1, 151, 1, 0.5);
}

.negative {
  color: rgba(200, 0, 0, 0.5);
}

h3 {
  display: inline-block;
  font: var(--header-4);
  font-weight: bolder;
}

p, h3 {
  margin: 0 5px;
}

p {
  display: inline;
  font: var(--body-copy-2);
}

.header-title:hover, .user:hover {
  cursor: pointer;
  opacity: 0.5;
}

@media screen and (max-width: 500px) {
  .info {
    grid-gap: 5px;
    grid-template-columns: 1fr 60px;
  }
  .likes {
    display: none;
  }
}

</style>
