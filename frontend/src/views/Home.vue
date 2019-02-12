<template>
  <div data-view>
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
            <p class="why-icon"><i class="material-icons theme">find_in_page</i></p>
            <h3>Browse Courses</h3>
            <p>Choose the courses that best suit you based on student feedback and reviews.</p>
          </div>
          <div class="why-card">
            <p class="why-icon"><i class="material-icons pink">contact_support</i></p>
            <h3>Ask Questions</h3>
            <p>Join the community. <router-link :to="'/signup'">Sign up</router-link> to ask questions about courses and vote for responses
            </p>
          </div>
          <div class="why-card">
            <p class="why-icon"><i class="material-icons orange">edit</i></p>
            <h3>Write Reviews</h3>
            <p>Have your say. Review courses and answer questions to help other students
            </p>
          </div>
        </div>
      </article>
    </section>
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
  display: grid;
}

.content {
  justify-self: center;
  margin: auto;
  padding: 20px;
}

.why {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: minmax(300px, 1fr);
  grid-gap: 20px;
  max-height: none;
}

.why-card {
  text-align: center;
  padding: 10px 20px;
  background-color: var(--white);
  min-height:200px;
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

@media screen and (min-width: 1200px) {
   .why-card {
     width: 270px;
   }
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
    width: 300px;
  }
}

@media screen and (max-width: 500px) {
  .why-card {
    width: 150px;
  }
}

</style>
