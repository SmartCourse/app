<template>
  <div class="app-auth-form" @keyup.enter="clickHandler">
    <TransparentCard>
      <div class="card-content">
        <h2 v-if="title">{{ title }}</h2>
        <form class="auth-form">
          <slot></slot>
          <router-link v-if="link" :to="{ name: link.name }" class="help-link">{{ link.text }}</router-link>
          <AppButton class="button-spacing" @click.native="clickHandler">
              {{ buttonText }}
          </AppButton>
        </form>
        <p class="error" v-if="error">{{ error }}</p>
      </div>
    </TransparentCard>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import TransparentCard from '@/components/Card/Transparent'

export default {
  name: 'auth-form',
  props: {
    clickHandler: {
      type: Function,
      required: true
    },
    link: {
      text: String,
      name: String
    },
    title: String,
    error: String,
    buttonText: String,
    flavour: String
  },
  components: { AppButton, TransparentCard }
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
  margin: 10px auto 0;
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

.help-link {
  font: var(--body-copy-1);
  text-align:right;
  color: var(--theme);
}

.error {
  padding: 10px;
  background-color: var(--white);
  text-align: center;
  border: var(--border);
}

</style>
