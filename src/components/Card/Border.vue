<template>
    <Card class="bordered border">
        <slot/>
    </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: { Card }
}
</script>

<style scoped>
.bordered {
    box-shadow: none;
    border-bottom: none;
}

li:last-child .bordered {
    border-bottom: var(--border);
}
</style>
