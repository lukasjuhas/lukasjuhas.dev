<template>
    <div id="app">
        <navigation></navigation>
        <!-- <img src="./images/logo.svg"> -->
        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'app',
  components: {
    Navigation,
  },
};
</script>
