<template>
    <div class="avatar">
        <div :class="`${background} letter`">
          {{ displayName.charAt(0).toUpperCase() }}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    displayName: String
  },
  computed: {
    background() {
      let cls = 'black'
      const id = this.userID % 6
      switch (id) {
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
  background-color: #673ab7;
}

.red {
  background-color: #ff5722;
}

.orange {
  background-color: #ff9800;
}

.blue {
  background-color: #2196f3;
}

.black {
  background-color: var(--soft-black);
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
