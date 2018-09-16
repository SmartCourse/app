<template>
  <div>
    <section class="main-content home">
      <AppLogo :first="'Smart'" :last="'Course'"/>
      <p>Making the most of your degree.</p>
      <Search/>
    </section>
    <section class="homepage-section">
      <article class="content">
        <h2>Best in class.</h2>
        <div class="why">
          <div class="why-card">
            <h3>For you.</h3>
            <p><i class="material-icons">person</i></p>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
          <div class="why-card">
            <h3>By you.</h3>
            <p>Thing B</p>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
          <div class="why-card">
            <h3>For a better you.</h3>
            <p>Thing B</p>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
        </div>
      </article>
    </section>
    <section class="homepage-section who">
      <article class="content">
        <p>Our story.</p>
      </article>
    </section>
    <section class="homepage-section offer">
      <p>Sign up today.</p>
    </section>
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
  background-color: var(--white);
  /* override main-content width */
  max-width: none;
  width:100%;
}

.homepage-section {
  margin: 20px 0;
  display: grid;
  min-height: 400px;
}

.content {
  justify-self: center;
  margin: auto;
  width: 800px;
}

.why {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: minmax(300px, 1fr);
  grid-gap: 10px;
  max-height: none;
}

.why-card {
  padding: 10px;
  background-color: var(--theme-light);
  width: 250px;
  min-height: 300px;
}

.homepage-section:nth-child(odd) {
  background-color: var(--white);
}

.homepage-section:nth-child(odd) {
  background-color: #fcfcfc;
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
