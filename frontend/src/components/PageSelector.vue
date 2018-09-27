<template>
  <div class="PageSelector">
    <div class='button-container'>
      <AppButton @click.native="goPrevPage()">Prev</AppButton>
      <span>{{currPage}}</span>
      <AppButton @click.native="goNextPage()">Next</AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'PageSelector',
  components: {
    AppButton
  },
  props: {
    currPage: Number,
    lastPage: Number,
    update: Function
  },
  methods: {
    goFirstPage() {
      this.update(1)
    },
    goPrevPage() {
      if (this.currPage > 1) {
        this.update(this.currPage - 1)
      }
    },
    goNextPage() {
      if (this.currPage < this.lastPage) {
        this.update(this.currPage + 1)
      }
    },
    goLastPage() {
      this.update(this.lastPage)
    }
  }
}
</script>

<style>
.button-container {
    text-align:center;
}
</style>
