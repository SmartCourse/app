<template>
    <div class="bio">
        <figure>
             <img class="avatar" :src="image"/>
        </figure>
        <h2 class="name">{{ name }}</h2>
        <h3 class="degree">{{ degree }} <span class="grad-year">'{{ year }}</span></h3>
        <p class="description" v-if="description">{{ description }}</p>
    </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    image: String,
    author: Number
  },
  data() {
    return {
      name: 'Jeff Daniels',
      description: 'The baddest bad guy out there, since that time at the pub.',
      reputation: 'verified',
      degree: 'B. Sc.',
      year: 2010
    }
  }

}
</script>

<style scoped>

.bio {
    text-align: center;
}

.name, .description {
    margin: 10px 0px;
}

p {
    text-align: left;
    font: inherit;
}

figure {
    border: var(--border);
    border-radius: 100%;
    margin: auto;
    width: 80px;
    height: 80px;
    background-color: var(--theme-light);
}

.avatar {
    margin: 10px;
    width: 60px;
    height: auto;
}

@media screen and (max-width: 400px) {

    .bio {
        font-size: var(--font-small-mobile);
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
    }

    .avatar {
        margin: 5px;
        width: 30px;
        height: auto;
    }

    figure {
        margin: 0px;
        width: 40px;
        height: 40px;
    }

    .name {
        margin: 10px;
    }
}

</style>
