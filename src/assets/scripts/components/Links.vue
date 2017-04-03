<template>
    <ul class="links">
        <li class="link">
          <a href="https://twitter.com/itslukasjuhas" target="_blank" rel="noopener"><svg class="link__icon"><use xlink:href="#twitter"></use></svg></a>
        </li>
        <li class="link">
            <a href="https://github.com/lukasjuhas" target="_blank" rel="noopener"><svg class="link__icon"><use xlink:href="#github"></use></svg></a>
        </li>
        <li class="link">
            <a href="https://profiles.wordpress.org/lukasneptun/#content-plugins" target="_blank" rel="noopener"><svg class="link__icon"><use xlink:href="#wordpress"></use></svg></a>
        </li>
        <li class="link">
            <a href="https://instagram.com/lukasjuhas" target="_blank" rel="noopener"><svg class="link__icon"><use xlink:href="#instagram"></use></svg></a>
        </li>
        <li class="link">
            <a href="https://open.spotify.com/user/itslukasjuhas" target="_blank" rel="noopener"><svg class="link__icon"><use xlink:href="#spotify"></use></svg></a>
        </li>
    </ul>
</template>

<script>
  export default {
    name: 'links',
  };
</script>

<style lang="scss">
  .links {
    list-style: none;
    margin: $base-spacing-unit 0;
  }

  .link {
    display: inline-block;
    margin: 0 ($base-spacing-unit / 2);
    transition: transform $animation-speed ease-in-out;

    &:hover {
      transform: translateY(-3px);
    }
  }

  .link__icon {
    width: 30px;
    height: 30px;
  }
</style>
