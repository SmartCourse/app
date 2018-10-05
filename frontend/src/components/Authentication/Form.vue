<template>
  <div class="app-auth-form">
    <h1 v-if="flavour">{{ flavour }}</h1>
    <Card>
      <div class="card-content">
        <h2>{{ title }}</h2>
        <form class="auth-form">
          <slot></slot>
          <AppButton class="button-spacing" @click.native="clickHandler">
              {{ buttonText }}
          </AppButton>
        </form>
        <p v-if="error">{{ error }}</p>
      </div>
    </Card>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import Card from '@/components/Card'

export default {
  name: 'auth-form',
  props: {
    clickHandler: {
      type: Function,
      required: true
    },
    title: String,
    error: String,
    buttonText: String,
    flavour: String
  },
  components: { AppButton, Card }
}
</script>

<style scoped>
h1 {
  margin: 20px;
  font: var(--header-1);
}

h2 {
  font: var(--header-2);
  margin: 20px;
}

h1, h2 {
  text-align: center;
}

.auth-form {
  font: var(--body-copy-1);
  display: grid;
  grid-auto-flow: row;
  grid-gap: 20px;
}

.button-spacing {
  width: 80%;
  margin: auto;
  margin-top: 30px;
}

.app-auth-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: inherit;
}

.card-content {
  max-width: 340px;
  width: 320px;
  min-height: 300px;
  padding: 0px 10px;
  margin-bottom: 20px;
}

/*
@media screen and (max-width: 450px) {
    .app-auth-form {
      flex-direction: row;
    }
}
*/

</style>
