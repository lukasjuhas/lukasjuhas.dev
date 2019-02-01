<template>
  <svg
    :class="{'visible': show}"
    class="logo"
    clip-rule="evenodd"
    fill-rule="evenodd"
    stroke-width="0"
    stroke-linejoin="round"
    stroke-miterlimit="1.41421"
    viewBox="0 0 287 287"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m264.33 143c0-66.98-54.3-121.29-121.29-121.29-66.98-.01-121.24 54.29-121.24 121.29s54.3
      121.3 121.3 121.3c66.93 0 121.2-54.3 121.2-121.3zm-121.29-142.69c78.81 0 142.7 63.9 142.7
      142.69 0 78.81-63.881 142.7-142.69 142.7-78.82 0-142.75-63.9-142.75-142.7.05-78.8 63.9-142.7
      142.7-142.69z"
    ></path>
    <path d="m114.5 43.1h21.4v171.2h-21.4z"></path>
    <path d="m150.2 78.8h21.4v164.1h-21.4z"></path>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Logo extends Vue {
  @Prop({ default: true })
  show: boolean;
}
</script>

<style lang="scss" scoped>
.logo {
  width: 50px;
  height: 50px;
  position: fixed;
  z-index: 100;
  top: $spacing-base;
  left: $spacing-base;
  transition: all $animation-speed $animation;
  opacity: 0;
  fill: $col-logo;

  &.visible {
    opacity: 1;
  }

  .dark & {
    fill: $col-logo-light;
  }
}
</style>
