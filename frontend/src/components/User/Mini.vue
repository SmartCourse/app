<template>
    <router-link :to="{ name: 'Profile', params: { id: String(id) } }" tag='div' class="avatar">
        <!-- TODO: use picture if present -->
        <div :class="`${background} letter`">
          {{ name && name.charAt(0).toUpperCase() || '?'}}
        </div>
        <!--div :class="" :style="`background-image:url(${picture});`" v-else /-->
    </router-link>
</template>

<script>
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
      let cls = 'black'
      switch (this.id % 7) {
      case 1: cls = 'green'
        break
      case 2: cls = 'purple'
        break
      case 3: cls = 'red'
        break
      case 4: cls = 'orange'
        break
      case 5: cls = 'blue'
        break
      case 6: cls = 'dark-blue'
        break
      }
      return cls
    }
  }
}
</script>

<style scoped>

.green {
  background-color: #8bc34a;
}

.purple {
  background-color: var(--color-purple);
}

.red {
  background-color: #ff5722;
}

.orange {
  background-color: #ff9800;
}

.blue {
  background-color: var(--color-blue);
}

.dark-blue {
  background-color: #0712f7;
}

.black {
  background-color: #373737;
}

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
