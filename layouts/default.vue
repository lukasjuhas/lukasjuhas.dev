<template>
  <div class="main" :class="this.$store.getters.theme">
    <app-header />
    <div class="content">
      <nuxt />
    </div>
    <footer class="footer"></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppHeader from '~/components/Header.vue'

@Component({
  components: {
    AppHeader,
  },
})
export default class Default extends Vue {}
</script>
