<template>
    <nav class="navigation">
        <ul class="list list--nav">
            <li class="list-item">
                <router-link to="/photos">Photos</router-link>
            </li>
            <li>
                <router-link to="/despatches">Despatches</router-link>
            </li>
            <li>
                <router-link to="/records">Records</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
  export default {
    name: 'navigation',

    data() {
      return {
        //
      };
    },
  };
</script>

<style lang="scss">
  .navigation {
    position: absolute;
    right: $base-spacing-unit;
    top: $base-spacing-unit;
  }

  .list--nav {
    list-style: none;
    margin: 0;

    .list-item {
      display: inline-block;
    }
  }
</style>
