<template>
    <div class="user">
        <div class="letter">
        {{ ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map((l) => l.toUpperCase())[Math.floor(Math.random() * 26)] /* should be likes */}}
        </div>
    </div>
</template>

<style scoped>

.letter {
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
