<template>
    <div class="navigation-wrapper">
        <div class="hamburger" @click="open = !open"  v-bind:class="{ active: open }">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </div>
        <transition name="fade">
            <nav class="navigation" v-if="open">
                <ul class="list list--nav">
                    <li class="list-item">
                        <router-link to="/photos">Photos</router-link>
                    </li>
                    <li class="list-item">
                        <router-link to="/despatches">Despatches</router-link>
                    </li>
                    <li class="list-item">
                        <router-link to="/records">Records</router-link>
                    </li>
                </ul>
            </nav>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'navigation',

    data() {
      return {
        open: false,
      };
    },
  };
</script>

<style lang="scss">
  .hamburger {
    position: fixed;
    top: $base-spacing-unit;
    right: $base-spacing-unit;
    z-index: 1000;

    .line {
      width: 35px;
      height: 3px;
      background-color: $col-background-dark;
      display: block;
      margin: 8px auto;
      transition: all $animation-speed ease-in-out;

      .dark & {
        background-color: $col-background;
      }
    }

    &:hover {
      cursor: pointer;
    }

    &.active {
      .line {
        background-color: $col-background;

        &:nth-child(2){
          opacity: 0;
        }

        &:nth-child(1){
          transform: translateY(11px) rotate(45deg);
        }

        &:nth-child(3){
          transform: translateY(-11px) rotate(-45deg);
        }
      }
    }
  }

  .navigation {
    z-index: 500;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .85);
    text-align: center;
  }

  .list--nav {
    position: absolute;
    list-style: none;
    margin: 0;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 48px;

    .list-item {
      a {
        display: block;
        color: $col-text-light;
        padding: $base-spacing-unit / 2;
      }
    }
  }
</style>
