<template>
    <div class="user">
        <div :class="`${background} letter`">
        {{ ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map((l) => l.toUpperCase())[Math.floor(Math.random() * 26)] /* should be likes */}}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    user: Number
  },
  computed: {
    background() {
      let cls = 'black'
      const id = this.user % 6
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
  background-color: #aaa;
}

.letter {
  padding: 10px;
  color: white;
  margin: 5px 0;
  width: 20px;
  height:20px;
  line-height: 20px;
  text-align: center;
  border-radius: 100%;
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user:hover {
  cursor: pointer;
  opacity: 0.5;
}

</style>
