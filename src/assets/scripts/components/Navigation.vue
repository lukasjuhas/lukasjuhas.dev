<template>
    <div class="navigation">
        <ul>
            <li><router-link to="/despatches">Despatches</router-link></li>
            <li><router-link to="/records">Records</router-link></li>
        </ul>
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
  background-color: red;
}
</style>
