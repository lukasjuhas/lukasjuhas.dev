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

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

@Component({})
export default class StaggeredFade extends Vue {
  @Prop()
  tag: string = 'div';

  public beforeEnter(el) {
    el.classList.add('staggered-fade-item');
  }

  public enter(el) {
    const delay = el.dataset.index * 100;

    setTimeout(() => {
      el.classList.add('staggered-fade-item--visible');
    }, delay);
  }

  public leave(el) {
    const delay = el.dataset.index * 100;

    setTimeout(() => {
      el.classList.remove('staggered-fade-item--visible');
    }, delay);
  }
}
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
