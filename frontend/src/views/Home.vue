<template>
  <div>
    <section class="main-content home">
      <AppLogo class="splash" :first="'Smart'" :last="'Course'"/>
      <p>Community-driven ratings, reviews and info about UNSW courses.</p>
      <Search/>
      <p>or <router-link :to="'/subject'">browse by subject area</router-link></p>
    </section>
    <section class="homepage-section">
      <article class="content">
        <div class="why">
          <div class="why-card">
            <p class="why-icon"><i class="material-icons theme">person</i></p>
            <h3>Individual Value</h3>
            <p>SmartCourse is primarily driven by a desire to give you a richer university experience.
               Choose the courses that best suit you based on student feedback and reviews.</p>
          </div>
          <div class="why-card">
            <p class="why-icon"><i class="material-icons pink">people</i></p>
            <h3>Community Driven</h3>
            <p>SmartCourse lives off its community. We don't overthink things. We're just reflecting
              what you say to help as many people as possible. </p>
          </div>
          <div class="why-card">
            <p class="why-icon"><i class="material-icons orange">school</i></p>
            <h3>Helping Universities</h3>
            <p>Universities rely on SmartCourse to provide the
              organic feedback that student surveys stuggle to deliver.
              Could your university benefit from SmartCourse? Get in touch.</p>
          </div>
        </div>
      </article>
    </section>
    <!--section class="homepage-section who">
      <article class="content">
        <div>Our story.</div>
      </article>
    </section>
    <section class="homepage-section offer">
      <article class="content">
        <div>Sign up today.</div>
      </article>
    </section-->
  </div>
</template>

<script>
import Search from '@/components/Search'

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
  padding: 0 20px;
}

.home > p {
  font-size: var(--font-medium);
  text-align: center;
}

.splash {
  font-size: 5rem;
  margin:0.5em auto;
}

.homepage-section {
  padding: 20px 0;
  display: grid;
  min-height: 400px;
}

.content {
  justify-self: center;
  margin: auto;
}

.why {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: minmax(300px, 1fr);
  grid-gap: 20px;
  max-height: none;
}

.why-card {
  border-radius: 4px;
  text-align: center;
  padding: 10px 20px;
  background-color: var(--white);
  width: 275px;
  min-height: 300px;
}

.why-card p {
  color: var(--soft-black);
}

.why-icon .material-icons {
  color: var(--white);
  padding: 0.5em;
  font-size: var(--font-large);
  border-radius: 100%;
}

.why-icon .orange {
  background-color: #ff9800;
}

.why-icon .theme {
  background-color: var(--theme);
}

.why-icon .pink {
  background-color: pink;
}

.offer {
  background-color: var(--white);
}

.who {
  background-color: var(--theme);
}

p {
  margin: 10px auto;
}

a {
    color:var(--theme)
}

/* tablet and below */
@media screen and (max-width: 700px) {
  .home {
   font-size: var(--font-large-mobile);
  }

  .home > p {
    font-size: var(--font-medium-mobile);
  }

  .home > p {
    max-width: 400px;
  }

  .splash {
   font-size: 3rem;
  }

  .why {
    grid-template-columns: none;
    grid-auto-flow: row;
  }

  .why-card {
    width: 400px;
  }
}

@media screen and (max-width: 500px) {
  .why-card {
    width: 280px;
  }
}

@media screen and (min-width: 700px) {
  .why-card {
    width: 200px;
  }
}

@media screen and (min-width: 1200px) {
   .why-card {
     width: 340px;
     min-height: 340px;
   }

   .why {
     grid-gap: 40px;
   }

   .content {
     padding: 40px 0;
   }
}

</style>
