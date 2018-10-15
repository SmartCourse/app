<template>
    <div class="inline">
        <h3 class="name">{{ name }}</h3>
        <p class="role">{{ degree }}</p>
    </div>
</template>

<script>
export default {
  props: {
    name: String,
    degree: String
  }
}
</script>

<style scoped>
.name {
    color: var(--theme);
    font: var(--header-4);
}

.role {
    border: var(--border);
    font: var(--body-copy-2);
}

.name, .role {
    padding: 5px;
    margin: 0;
    line-height: 10px;
}

.inline {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>
