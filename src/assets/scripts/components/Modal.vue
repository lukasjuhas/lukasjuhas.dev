<template>
    <transition name="modal">
        <div class="modal-mask" @click="handleClick" v-if="toggle" v-on:keyup.esc="toggle = false">
            <div class="modal-wrapper">
                <div class="modal-container" :class="{ 'modal-container--medium': medium, 'modal-container--large': large }">
                    <button v-if="!noClose" type="button" class="modal-close" @click="toggle = false"></button>
                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button v-if="cancelButton" type="button" class="button button--secondary button--block" @click="toggle = false">Cancel</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'modal',

    data() {
      return {
        toggle: false,
      }
    },

    methods: {
      handleClick(event) {
        if(event.target.className === 'modal-wrapper') {
          this.toggle = false;
        }
      }
    }

  }
</script>

<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $col-overlay;
    display: table;
    transition: opacity $animation-speed-fast $animation;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    position: relative;
    width: 400px;
    max-width: 80%;
    margin: 0 auto;
    padding: $base-spacing-unit;
    background-color: $col-background;
    transition: all $animation-speed-fast $animation;

    &.modal-container--medium {
      width: 650px;
    }

    &.modal-container--large {
      width: 800px;
    }
  }

  .modal-header {
    margin-right: $base-spacing-unit;

    h3 {
      margin-top: 0;
      color: $col-brand;
    }
  }

  .modal-body {
    margin: $base-spacing-unit 0 0;
  }

  .modal-close {
    position: absolute;
    top: $base-spacing-unit;
    right: $base-spacing-unit;
    width: 20px;
    height: 20px;
    overflow: hidden;
    background: transparent;
    cursor: pointer;

    &:hover {
      &::after,
      &::before {
        background: $col-brand;
      }
    }

    &::after,
    &::before {
      content: " ";
      position: absolute;
      height: 2px;
      width: 100%;
      top: 50%;
      left: 0;
      margin-top: -1px;
      background: $col-text;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  // vue
  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    transform: scale(1.1);
  }
</style>
