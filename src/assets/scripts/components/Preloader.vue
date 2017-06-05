<template>
    <transition name="fade-slow">
        <div class="preloader" v-if="sharedState.loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </transition>
</template>

<script>
  import store from '../store';

  export default {
    name: 'preloader',

    data() {
      return {
        sharedState: store.state,
      };
    },
  };
</script>

<style lang="scss">
  $white:#FFF;
  $blue:#0091E5;
  $red:#E42149;
  $yellow:#FFF146;

  @keyframes preloader {
    from {left: 0}
    to {left: -400%}
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
      background: linear-gradient( 45deg, $white, $blue, $red, $yellow, $white );
      width: 500%;
      height: 4px;
      position: absolute;
      z-index: 1;
      top: 0;
      animation: preloader $animate-preloader linear 0s infinite alternate;
    }
  }
</style>
