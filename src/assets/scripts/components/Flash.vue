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

    data() {
      return {
        sharedState: store,
      }
    },

    mounted() {
      if(this.autohide) {
        setTimeout(() => {
          this.sharedState.state.flash.show = false;
        }, 3000);
      }
    },

    methods: {
      hideFlash() {
        document.documentElement.classList.remove(this.sharedState.state.flash.status);
        this.sharedState.state.flash.show = false;
      }
    }
  };
</script>

<style lang="scss">
  .flash {
    line-height: 1.35em;
    position: absolute;
    width: auto;
    z-index: 500;
    top: $base-spacing-unit;
    left: 0;
    font-weight: bold;
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
      color: $col-text;
      font-size: 32px;
      text-decoration: none;
      font-weight: normal;
      position: absolute;
      right: 0;
      top: 0;
      vertical-align: top;
      line-height: .5;

      &:hover {
        text-decoration: none;
      }

      .dark & {
        color: $col-text-light;
      }
    }

    ul {
      margin: 0;
    }
  }
</style>
