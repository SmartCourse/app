<template>
    <Card>
        <div class="card-content">
            <div class="meta-fields">
                <p class="vote">&plus;</p>
                <p class="likes">{{ likes }}</p>
                <p class="vote">&minus;</p>
            </div>
            <div class="content">
                <!-- v-if here just stops router error due to async data -->
                <div :class="'recommend '+recommendIcon.class">
                    <i class="material-icons">{{ recommendIcon.icon }}</i>
                </div>
                <router-link v-if="code" tag="h2" :to="{ name: 'review', params: { code, id }}">
                    {{ title }}
                </router-link>
                <p>
                    {{ body }}
                </p>
            </div>
            <aside class="user">
                <User :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-1.png'"/>
                <p class="date">Asked: <time>{{ published }}</time></p>
            </aside>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'
import User from '@/components/UserSummary'

export default {
  components: { Card, User },
  props: {
    code: String,
    id: String,
    title: String,
    body: String,
    likes: Number,
    recommend: Number,
    author: Number,
    published: String
  },
  computed: {
    recommendIcon () {
      if (this.recommend === 1) {
        return {class: 'blue', icon: 'thumb_up', text: 'recommended'}
      } else {
        return {class: 'red', icon: 'thumb_down', text: 'not recommended'}
      }
    }
  }
}
</script>

<style scoped src='../../css/card.less' lang='less'>
</style>

<style scoped>
.material-icons {
    font-size:35px;
}
h2 {
    margin-top:3px;
}
.recommend {
    float:left;
    margin-right:10px;
}
.blue {
    color:#0099ee;
}
.red {
    color:#dd2222;
}
</style>
