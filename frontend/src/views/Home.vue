<template>
  <div class="main-content home">
    <AppLogo :first="'Smart'" :last="'Course'"/>
    <p>Making the most of your degree.</p>
    <Search/>
  </div>
</template>

<script>
import Search from '@/components/AppSearch'

export default {
  components: { Search }
}
</script>

<style scoped>

.home {
  font-size: var(--font-large);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:white;
  /* override main-content width */
  max-width: none;
  width:100%;
}

p {
  margin: 10px auto;
}

@media screen and (max-width: 768px) {
  .home {
   font-size: var(--font-large-mobile);
  }
}

</style>
