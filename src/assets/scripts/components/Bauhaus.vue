<template>
    <div class="bauhaus" :class="{'bauhaus--fallback' : !supported}">
        <span v-model="bauhausItem" class="bauhaus__item">Testing</span>
        <span class="bauhaus__item">Testing</span>
        <span class="bauhaus__item">Testing</span>
    </div>
</template>

<script>
  // IN DEV
  export default {
    mounted() {
      if (window.getComputedStyle(this.bauhausItem).mixBlendMode !== undefined) {
        this.supported = false;
      }
    },

    data() {
      return {
        supported: true,
      };
    },
  };
</script>

<style lang="scss">
  $blue: #0091E5;
  $red: #E42149;
  $yellow: #FFF146;

  .bauhaus {
    position: relative;
  }

  .bauhaus__item {
    font-family: 'Helvetica', sans-serif;
    font-weight: bold;
    font-size: 48px;
    text-transform: uppercase;
    letter-spacing: -.1em;
    position: absolute;

    transform: translate(30%,-40%);
    transform-origin: left;
    // mix-blend-mode: multiply;

    &:nth-child(1) {
      color: $blue;
      transform: translate(30%, -40%);
    }

    &:nth-child(2) {
      color: $red;
      transform: translate(32.5%, -40%);
    }

    &:nth-child(3) {
      color: $yellow;
      transform: translate(35%, -40%);
    }
  }

  .bauhaus--fallback {
    .bauhaus__item {
      opacity: .8;

      &:nth-child(1) {
        z-index: 2;
      }

      &:nth-child(2) {
        z-index: 3;
      }

      &:nth-child(3) {
        z-index: 1;
      }

    }
  }
</style>
