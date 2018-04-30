<template>
    <transition name="slide-fade">
        <div v-if="sharedState.state.flash.show" class="flash" v-bind:class="'flash--' + sharedState.state.flash.status">
            <div class="flash__content">
                {{ sharedState.state.flash.content }}
                <button v-if="!sharedState.state.flash.autohide" @click="hideFlash" class="flash__dismiss button--link">&times;</button>
            </div>
        </div>
    </transition>
</template>

<script>
  import store from '../store';

  export default {
    name: 'flash',

    props: ['status', 'content', 'autohide'],

    methods: {
      hideFlash() {
        document.documentElement.classList.remove(this.sharedState.state.flash.status);
        this.sharedState.state.flash.show = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .flash {
    line-height: 1.35em;
    position: fixed;
    width: auto;
    z-index: 500;
    top: $base-spacing-unit;
    left: 0;
    font-weight: $font-weight-bold;
    padding: ($base-spacing-unit / 2) $base-spacing-unit 0;

    > p,
    > ul {
      margin-bottom: 0;
    }

    > p + p {
      margin-top: $base-spacing-unit;
    }

    .flash__content {
      position: relative;
      display: inline-block;
      padding-right: $base-spacing-unit * 2;
    }

    .flash__dismiss {
      color: $col-text-light;
      font-size: 32px;
      text-decoration: none;
      font-weight: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 0;
      vertical-align: top;
      line-height: 0.5;

      &:hover {
        text-decoration: none;
      }

      .light & {
        color: $col-text;
      }
    }

    ul {
      margin: 0;
    }
  }
</style>
