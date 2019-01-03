<template>
  <transition-group
    :tag="tag"
    :css="false"
    name="staggered-fade"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: 'StaggeredFade',

  props: {
    tag: {
      type: String,
      required: false,
      default: 'div',
    },
  },

  methods: {
    beforeEnter(el) {
      el.classList.add('staggered-fade-item');
    },

    enter(el) {
      const delay = el.dataset.index * 100;

      setTimeout(() => {
        el.classList.add('staggered-fade-item--visible');
      }, delay);
    },

    leave(el) {
      const delay = el.dataset.index * 100;

      setTimeout(() => {
        el.classList.remove('staggered-fade-item--visible');
      }, delay);
    },
  },
};
</script>

<style lang="scss">
.staggered-fade-item {
  opacity: 0;
  transition: opacity $animation-speed $animation;
}

.staggered-fade-item--visible {
  opacity: 1;
}
</style>
