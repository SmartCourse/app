<template>
    <router-link :to="{ name: 'Profile', params: { id: String(id) } }" tag='div' class="avatar">
        <!-- TODO: use picture if present -->
        <div :class="`bg--${background} letter`">
          {{ name && name.charAt(0).toUpperCase() || '?'}}
        </div>
        <!--div :class="" :style="`background-image:url(${picture});`" v-else /-->
    </router-link>
</template>

<script>
import { colorFromId } from '@/utils/helpers'

export default {
  props: {
    name: String,
    id: {
      type: Number,
      required: true
    },
    picture: String
  },
  computed: {
    background() {
      return colorFromId(this.id)
    }
  }
}
</script>

<style scoped>
.letter {
  padding: 10px;
  color: white;
  margin: 5px 0;
  width: 25px;
  height:25px;
  line-height: 25px;
  text-align: center;
  border-radius: 100%;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar:hover {
  cursor: pointer;
  opacity: 0.5;
}

</style>
