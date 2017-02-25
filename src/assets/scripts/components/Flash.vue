<template>
    <transition name="slide-fade">
        <div v-if="sharedState.state.flash.show" class="flash" v-bind:class="'flash--' + sharedState.state.flash.status">
            <div class="container">
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
    line-height: 50px;
    position: absolute;
    width: auto;
    z-index: 500;
    top: 26px;
    left: 75px;
    font-weight: bold;

    > p,
    > ul {
      margin-bottom: 0;
    }

    > p + p {
      margin-top: $base-spacing-unit;
    }

    // &.flash--success {
    //   color: $col-text;
    // }
    //
    // &.flash--info {
    //   color: $col-text;
    // }
    //
    // &.flash--warning {
    //   color: $col-text;
    // }
    //
    // &.flash--error {
    //   color: $col-text;
    // }

    .flash__dismiss {
      float: right;
      color: $col-text;
      font-size: 32px;
      line-height: 23px;
      text-decoration: none;
      font-weight: normal;
      margin: 10px 0 0 $base-spacing-unit;

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
