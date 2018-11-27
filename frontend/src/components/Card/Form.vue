<template>
    <Card>
        <div class="content">
            <CardHeader>{{ title }}</CardHeader>
            <form>
                <slot/>
            </form>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'
import CardHeader from '@/components/Card/Header'

export default {
  components: { Card, CardHeader },
  props: {
    title: String
  }
}
</script>

<style scoped>
.content {
  padding: 10px 20px;
}
</style>
