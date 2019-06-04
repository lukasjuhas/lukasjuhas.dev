<template>
  <nav
    :class="{'visible': show}"
    class="nav"
  >
    <ul class="nav-list">
      <li>
        <nuxt-link to="/books">
          Books
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Navigation extends Vue {
  @Prop({ default: true })
  show: boolean;
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  z-index: 100;
  top: $spacing-lg;
  right: $spacing-lg;
  transition: all $animation-speed $animation;
  opacity: 0;
  fill: $col-logo;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;

  &.visible {
    opacity: 1;
  }

  .dark & {
    fill: $col-logo-light;
  }

  a {
    text-decoration: none;
  }
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

