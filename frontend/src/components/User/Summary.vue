<template>
    <div class="user">
        <Mini :userID="userID" :name="name"/>
        <div class="user-info">
            <Name :name="name" :degree="'B. Arts'" />
            <p><time>{{ published }} ago</time></p>
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
    name: String,
    /* Requred for linking */
    userID: Number,
    /* provided by container */
    degree: String,
    /* Epoch time -- or this should be time ago */
    published: String
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
