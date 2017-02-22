<template>
    <transition name="fade">
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

    data: function() {
      return {
        sharedState: store.state,
      }
    },
  };
</script>

<style lang="scss">
  .preloader {
    position: fixed;
    left: 96px;
    top: 38px;

    span {
      display: inline-block;
      width: 3px;
      height: 10px;
      background-color: $col-background-dark;

      .dark & {
        background-color: $col-background;
      }

      &:nth-child(1) {
        animation: grow 1s ease-in-out infinite;
      }
      &:nth-child(2) {
        animation: grow 1s ease-in-out 0.15s infinite;
      }
      &:nth-child(3) {
        animation: grow 1s ease-in-out 0.30s infinite;
      }
      &:nth-child(4) {
        animation: grow 1s ease-in-out 0.45s infinite;
      }
    }
  }

  @keyframes grow {
    0%,
    100% {
      -webkit-transform: scaleY(1);
      -ms-transform: scaleY(1);
      -o-transform: scaleY(1);
      transform: scaleY(1);
    }

    50% {
      -webkit-transform: scaleY(1.8);
      -ms-transform: scaleY(1.8);
      -o-transform: scaleY(1.8);
      transform: scaleY(1.8);
    }
  }
</style>
