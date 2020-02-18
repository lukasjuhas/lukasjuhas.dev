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
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component({})
export default class StaggeredFade extends Vue {
  @Prop()
  tag: string = 'div'

  public beforeEnter(el: any) {
    el.classList.add('staggered-fade-item')
  }

  public enter(el: any) {
    const delay = el.dataset.index * 100

    setTimeout(() => {
      el.classList.add('staggered-fade-item--visible')
    }, delay)
  }

  public leave(el: any) {
    const delay = el.dataset.index * 100

    setTimeout(() => {
      el.classList.remove('staggered-fade-item--visible')
    }, delay)
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
