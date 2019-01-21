<template>
  <transition name="fade-slow">
    <div v-if="$store.loading" class="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({})
export default class Preloader extends Vue {}
</script>

<style lang="scss" scoped>
$white: #fff;
$blue: #0091e5;
$red: #e42149;
$yellow: #fff146;

@keyframes preloader {
  from {
    left: 0;
  }
  to {
    left: -400%;
  }
}

.preloader {
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 4px;
  background: $col-background;
  position: fixed;
  overflow: hidden;
  z-index: 1000;

  &:before {
    content: ' ';
    background: linear-gradient(45deg, $white, $blue, $red, $yellow, $white);
    width: 500%;
    height: 4px;
    position: absolute;
    z-index: 1;
    top: 0;
    animation: preloader $animation-preloader linear 0s infinite alternate;
  }
}
</style>
