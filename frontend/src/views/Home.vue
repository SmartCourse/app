<template>
  <div class="home">
    <h1><span>Smart</span><span class="course">Course</span></h1>
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
  font-size: 40px;
  margin: 0 auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  padding: 10px 0px;
  border: 1px solid var(--theme-light);
}

h1 span {
    padding: 10px;
}

p {
  margin: 10px auto;
}

.course {
  color: white;
  background-color: var(--theme);
}

@media screen and (max-width: 768px) {
  .home {
   font-size: 24px;
  }
}

</style>

