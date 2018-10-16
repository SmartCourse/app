<template>
    <div class="inline">
        <h3 class="name">{{ name }}</h3>
        <p class="role">{{ degree }}</p>
        <p class="reputation">{{ reputation }}<i class="material-icons">star</i></p>
    </div>
</template>

<script>
export default {
  props: {
    name: String,
    degree: String,
    reputation: Number
  }
}
</script>

<style scoped>
.name {
    color: var(--theme);
    font: var(--header-4);
}

.role, .reputation {
    font: var(--body-copy-2);
}

.role {
    border: var(--border);
}

.name, .role, .reputation {
    padding: 5px;
    margin: 0;
    line-height: 10px;
}

.material-icons {
    width: 16px;
    height: 16px;
    font-size: inherit;
    vertical-align: middle;
}

.inline {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>
