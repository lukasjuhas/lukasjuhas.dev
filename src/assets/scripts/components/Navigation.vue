<template>
    <div class="page">
        <nav class="navigation">
          <ul>
            <li><router-link to="/despatches">Despatches</router-link></li>
            <li><router-link to="/records">Records</router-link></li>
          </ul>
        </nav>
        <router-view></router-view>
    </div>
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
  background-color: yellow;

  ul {
    margin: 0;
  }
}
</style>
