<template>
    <div class="links">
        <p>
          <a target=_blank :href="handbookURL">Handbook <i class="material-icons">launch</i></a>
        </p>
        <p v-if="outlineURL">
          <a target=_blank :href="outlineURL">Course Outline <i class="material-icons">launch</i></a>
        </p>
    </div>
</template>

<script>
export default {
  props: {
    handbookURL: String,
    outlineURL: String
  }
}
</script>

<style scoped>
.links {
    margin: 0;
    align-items: center;
    display: flex;
    border-bottom: var(--border);
    padding-bottom: 10px;
}

p {
    margin: 0;
    margin-right: 10px;
    font: var(--body-copy-1);
}
a:hover {
    color: var(--theme);
}

.material-icons {
    font-size: inherit;
    margin: auto;
    line-height: inherit;
    transform: translateY(2px);
}
</style>
