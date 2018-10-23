<template>
  <div class="PageSelector" v-if="lastPage">
    <div class='button-container'>
      <AppButton title="Previous page" class="material-icons" @click.native="goPrevPage()" :alt="false">chevron_left</AppButton>
      <h5>{{currPage}}</h5>
      <AppButton title="Next page" class="material-icons" @click.native="goNextPage()" :alt="false">chevron_right</AppButton>
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
  display: flex;
  width: 150px;
  margin: 10px auto;
  justify-content: space-between;
  align-items: center;
}

h5 {
  font: var(--header-4);
}

.button-container > button {
  font-family: 'Material Icons';
  font-weight: normal;
  font-size: 30px;
  line-height: 30px;
  padding: 10px;
}

</style>
