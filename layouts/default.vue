<template>
  <div class="main" :class="[$store.getters.theme, $nuxt.$route.name]">
    <app-header />
    <div class="content">
      <nuxt />
    </div>
    <footer class="footer"></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeader from '~/components/Header.vue'

@Component({
  components: {
    AppHeader,
  },
})
export default class Default extends Vue {}
</script>
