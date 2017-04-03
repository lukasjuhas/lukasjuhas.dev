<template>
    <li class="trip" v-if="item">
        <router-link  v-if="item.content" :to="'/trips/' + item.slug" :class="{ 'trip--small': !item.content }">
            <div v-if="item.feature" :style="'background-image: url(' + item.feature + ')'" class="trip__image"></div>
            <h1 class="trip__title">{{ item.title }}</h1>
            <h1 class="trip__title--secondary">{{ item.location }}</h1>
            <h3 class="trip__date">{{ item.date }}</h3>
        </router-link>
        <h2 v-else class="trip__title">{{ item.title }}</h2>
    </li>
</template>

<script>
  export default {
    name: 'trip-item',

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
  .trip {
    width: 100%;
    display: block;
    transition: all $animation-speed $animation;
    background-color: $col-background-dark;
    border-bottom: 1px solid lighten($col-background-dark, 10%);
    position: relative;

    .trip__title {
      color: lighten($col-background-dark, 10%);
      opacity: 1;
      transition: opacity $animation-speed ease-in-out;
    }

    a {
      padding: ($base-spacing-unit * 2.5) 0;
      text-decoration: none;
      display: block;
      transition: transform $animation-speed ease-in-out, padding $animation-speed-fast linear;
      position: relative;
      overflow: hidden;
      height: 175px;

      .trip__image {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        transform: translateY(-50%);
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        display: block;
        transition: height $animation-speed-fast ease-in-out, filter $animation-speed-fast linear;

        &:before {
          content: ' ';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: $col-background-dark;
          opacity: 0;
          transition: opacity $animation-speed-fast linear;
        }
      }

      .trip__title,
      .trip__title--secondary,
      .trip__date {
        color: $col-text-light;
        position: relative;
        z-index: 50;
        text-shadow: 1px 1px 3px $col-text;
      }

      .trip__date {
        transition: height $animation-speed-fast linear, opacity $animation-speed-fast linear;
        height: 0;
        margin: 0;
        overflow: hidden;
        opacity: 0;
      }

      .trip__title--secondary {
        display: none;
      }

      &:hover {
        padding: $base-spacing-unit 0;
        transform: scale(1.02);

        .trip__date {
          height: 33px;
          opacity: 1;
        }

        .trip__title {
          display: none;
        }

        .trip__title--secondary {
          display: block;
        }

        .trip__image {
          filter: blur(5px);
          height: 175px;

          &:before {
            opacity: .65;
          }
        }
      }
    }

    &:first-child {
      border-top: 1px solid lighten($col-background-dark, 10%);
    }
  }

  .trip--small {
    padding: ($base-spacing-unit / 2) 0;
  }

  .trip__title {
    margin: 0;
  }
</style>
