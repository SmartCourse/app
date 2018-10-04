<template>
  <div class="app-auth-form">
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
        <p class="back-link"><router-link to="/">Back to Home</router-link></p>
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
    buttonText: String
  },
  components: { AppButton, Card }
}
</script>

<style scoped>
h2 {
  font: var(--header-3);
  margin: 5px 0 10px;
}

.auth-form {
  font: var(--body-copy-1);
  display: grid;
  grid-auto-flow: row;
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

.back-link {
  color: var(--theme);
  display: block;
  margin-top: 20px;
  position: absolute;
  top: 0;
  right: 20px;
}

@media screen and (max-width: 450px) {
    .app-auth-form {
      flex-direction: row;
    }
}

</style>
