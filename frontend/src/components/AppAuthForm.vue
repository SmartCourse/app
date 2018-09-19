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
.auth-form {
  font: var(--body-copy-1);
  display: grid;
  grid-row-gap: 20px;
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
  top: 10px;
  right: 20px;
}

@media screen and (min-width: 768px) {
    .card-content {
        width: 450px;
    }
}
</style>
