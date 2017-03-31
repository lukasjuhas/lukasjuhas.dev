<template>
    <li class="holiday" v-if="item">
        <router-link  v-if="item.content" :to="'/holidays/' + item.slug" :class="{ 'holiday--small': !item.content }">
            <div v-if="item.feature" :style="'background-image: url(' + item.feature + ')'" class="holiday__image"></div>
            <h1 class="holiday__title">{{ item.title }}</h1>
            <h1 class="holiday__title--secondary">{{ item.location }}</h1>
            <h3 class="holiday__date">{{ item.date }}</h3>
        </router-link>
        <h2 v-else class="holiday__title">{{ item.title }}</h2>
    </li>
</template>

<script>
  export default {
    name: 'holiday-item',

    props: {
      item: {
        type: [Object, Array],
        required: true,
        default: false,
      },
    },
  }
</script>

<style lang="scss">
</style>
