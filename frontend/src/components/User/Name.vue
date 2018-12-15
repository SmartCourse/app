<template>
    <div class="inline">
        <h3 class="name">{{ name }}</h3>
        <p class="role" v-if="degree">{{ degree }}</p>
        <Reputation>{{ reputation }}</Reputation>
    </div>
</template>

<script>
import Reputation from './Reputation'

export default {
  props: {
    name: String,
    degree: String,
    reputation: Number
  },
  components: {
    Reputation
  }
}
</script>

<style scoped>
.name {
    color: var(--theme);
    font: var(--header-4);
}

.role {
    font: var(--body-copy-2);
    border: var(--border);
}

.name, .role {
    padding: 5px;
    margin: 0;
    line-height: 10px;
}

.inline {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
}
</style>
