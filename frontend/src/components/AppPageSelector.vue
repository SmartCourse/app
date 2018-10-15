<template>
  <div class="PageSelector" v-if="lastPage">
    <div class='button-container'>
      <AppButton @click.native="goPrevPage()" :alt="false">&laquo;</AppButton>
      <AppButton disabled="true">{{currPage}}</AppButton>
      <AppButton @click.native="goNextPage()" :alt="false">&raquo;</AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'AppPageSelector',
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

<style scoped>
.button-container {
  padding: 10px 0;
  text-align:center;
}

.button-container > button {
  margin: 5px;
}
</style>
