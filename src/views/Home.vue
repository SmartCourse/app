<template>
  <div data-view>
    <section class="home main-content">
      <AppLogo class="splash" :first="'Smart'" :last="'Course'"/>
      <p>Community-driven ratings, reviews and info about UNSW courses.</p>
      <Search/>
      <p>or <router-link :to="'/subject'">browse by subject area</router-link></p>
    </section>
    <section class="homepage-section">
      <article class="content">
        <div class="why">
          <PromoTile v-for="tile in promoTiles"
            :key="tile.title"
            v-bind="tile"
          />
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import Search from '@/components/Search'
import PromoTile from '@/components/PromoTile'

export default {
  components: { Search, PromoTile },
  data() {
    return {
      promoTiles: [
        {
          icon: {
            color: 'theme',
            name: 'find_in_page'
          },
          title: 'Browse Courses',
          copy: 'Choose the courses that best suit you based on student feedback and reviews.',
          link: {
            copy: 'Start searching',
            path: '/subject'
          }
        },
        {
          icon: {
            color: 'pink',
            name: 'contact_support'
          },
          title: 'Ask Questions',
          copy: 'Join the community. Sign up to ask questions about courses and vote for responses.',
          link: {
            copy: 'Sign up now',
            path: '/signup'
          }
        },
        {
          icon: {
            color: 'orange',
            name: 'edit'
          },
          title: 'Help Others',
          copy: 'Have your say. Review courses and answer questions to help other students.',
          link: {
            copy: 'Answer the unanswered',
            path: '/questions'
          }
        }
      ]
    }
  }
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
  margin: 0.5em auto;
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
@media screen and (max-width: 820px) {
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
}

</style>
