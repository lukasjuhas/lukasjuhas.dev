<template>
  <div class="error dark">
    <app-header />

    <div class="content">
      <h1 class="message">{{ message }}</h1>
      <nuxt-link class="error-link" to="/">Back to homepage</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import AppHeader from '~/components/Header.vue'

@Component({
  components: {
    AppHeader,
  },
})
export default class Error extends Vue {
  @Prop({ type: Object, required: true }) error!: Error

  get statusCode(): number {
    return (this.error && this.error.statusCode) || 500
  }

  get message(): string {
    return this.error.message || '¯\_(ツ)_/¯'
  }
}
</script>

<style lang="scss" scoped>
.error {
  min-height: 100vh;
  background-image: url('/vincent.gif');
  background-repeat: none;
  background-size: cover;
  display: flex;
  align-items: center;
  text-align: center;
  padding: $spacing-xl;
}

.content {
  width: 100%;
  color: $col-text-light;

  a {
    color: inherit;
  }
}
</style>
