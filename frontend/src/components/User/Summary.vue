<template>
    <div class="user">
        <Mini :name="displayName" :id="id" :picture="picture" />
        <div class="user-info">
            <Name :name="displayName" :degree="degree" :reputation="reputation" />
            <p v-if="published"><time>{{ published }}</time></p>
        </div>
    </div>
</template>

<script>
import Mini from './Mini'
import Name from './Name'

export default {
  components: {
    Mini,
    Name
  },
  props: {
    /* name/displayName */
    displayName: String,
    /* Requred for linking */
    id: {
      type: Number,
      required: true
    },
    /* provided by container */
    degree: String,
    picture: String,
    /* This should be a pre massaged Date string that reflects time since published */
    published: String,
    /* User repuation */
    reputation: { default: 0, type: Number }
  }
}
</script>

<style scoped>

.user {
    display: grid;
    grid-template-columns: 45px auto;
    grid-gap: 10px;
}

.user-info {
    margin: auto 0;
}

p {
    margin: 0;
    padding: 0 5px;
    font: var(--body-copy-2);
    color: var(--soft-black);
}

</style>
