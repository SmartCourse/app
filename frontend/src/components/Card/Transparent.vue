<template>
    <Card class="transparent">
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
.transparent {
    background: transparent;
    box-shadow: none;
}
</style>
