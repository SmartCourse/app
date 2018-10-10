<template>
  <Card class="feed-card">
    <UserMini/>
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
import UserMini from '@/components/User/Mini'

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
    Card,
    UserMini
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

.published, .likes {
  text-align: right;
}

.positive {
  color:rgba(1, 151, 1, 0.5);
}

.negative {
  color: rgba(200, 0, 0, 0.5);
}

h3 {
  font: var(--header-4);
  font-weight: bolder;
}

p, h3 {
  margin: 0 5px;
}

p {
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
