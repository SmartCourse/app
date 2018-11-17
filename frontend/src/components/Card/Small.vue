<template>
  <Card class="feed-card">
    <div class="info">
      <SecondHeader :routeName="routeName" :code="code" :id="id">
        {{ title }}
      </SecondHeader>
      <div class="secondary">
        <p>
            <span v-if="numAnswers === 0">Know the answer to this question?</span>
            <span v-else>{{ numAnswers }} Answers</span>
        </p>
        <p class="published">
            <time>{{ published }}</time>
        </p>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import SecondHeader from '@/components/Card/SecondaryHeader'

export default {
  props: {
    title: String,
    likes: Number,
    published: String,
    user: Object,
    numAnswers: {type: Number, default: 0},
    code: String,
    id: String,
    cardType: String,
    recommend: Boolean
  },
  components: {
    Card,
    SecondHeader
  },
  computed: {
    /* TODO use recommendation */
    routeName() {
      return this.cardType === 'Review' ? 'review' : 'question'
    }
  }
}
</script>

<style scoped>

.feed-card {
  border-radius: 0;
  margin: 0;
  min-width: 400px;
}

.info {
  display: block;
}

.published {
  text-align: right;
}

.secondary {
    display: flex;
    justify-content: space-between;
}

p {
  margin: 0 5px;
  font: var(--body-copy-2);
}

@media screen and (max-width: 600px) {
    .feed-card {
        min-width: auto;
        margin: auto;
    }
}

</style>
