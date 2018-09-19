<template>
    <div class='button-container'>
      <AppButton @click.native="prevPage()">Prev</AppButton>
      <span>{{pageNumber}}</span>
      <AppButton @click.native="nextPage()">Next</AppButton>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'PageSelector',
  components: {
    AppButton
  },
  data () {
    return {
      pageNumber: 1
    }
  },
  props: {
    update: Function
  },
  methods: {
    firstPage() {
      this.pageNumber = 1
      this.update(this.pageNumber)
    },
    prevPage() {
      if(this.pageNumber > 1) {
        this.pageNumber--
        this.update(this.pageNumber)
      }
    },
    nextPage() {
      this.pageNumber++
      this.update(this.pageNumber)
    },
    lastPage() {
      this.pageNumber = 2 // TODO: Last page stuff?
      this.update(this.pageNumber)
    }
  }
}
</script>

<style>
.button-container {
    text-align:center;
}
</style>
