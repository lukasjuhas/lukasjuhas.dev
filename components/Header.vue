<template>
  <header class="header">
    <nuxt-link to="/">
      <logo :show="show" />
    </nuxt-link>

    <!-- <navigation :show="show" /> -->
  </header>
</template>

<script lang="ts">
import { throttle } from 'throttle-debounce'
import { Vue, Component, Prop } from 'vue-property-decorator'
import Logo from '~/components/Logo.vue'
import Navigation from '~/components/Navigation.vue'

@Component({
  components: {
    Logo,
    Navigation,
  },
})
export default class AppHeader extends Vue {
  show: boolean = true

  mounted() {
    this.handleHeader()
  }

  handleHeader(forceShow = false) {
    if (forceShow) {
      this.show = true
    }

    let lastScrollTop = 0
    window.addEventListener(
      'scroll',
      throttle(300, () => {
        const st = window.pageYOffset || document.documentElement.scrollTop
        // offset 75px
        if (st > 75 && st > lastScrollTop) {
          this.show = false
        } else {
          this.show = true
        }
        lastScrollTop = st
      })
    )
  }
}
</script>
