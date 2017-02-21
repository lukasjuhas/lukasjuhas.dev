<template>
    <div class="page">
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col col--xs-12 col--sm-12 col--md-7 col--lg-7">
                        <article class="large-content">
                            <p>I'm Lukas Juhas and my main purpose on this planet is to enjoy life mainly by&nbsp;<router-link to="/code">writing code</router-link>,&nbsp;<router-link to="/photos">traveling</router-link>, making music and taking&nbsp;<router-link to="/photos">photographs</router-link>. Currently living and working in London as Full-stack Web Developer at <a href="https://benchmark.co.uk/" target="_blank">Benchmark</a>.</p>

                            <p>Say hello <a href="lukas@itsluk.as">lukas@itsluk.as</a>.</p>

                            <p>If you are looking for Wordpress plugins I wrote you can visit <a href="https://plugins.itsluk.as/" target="_blank">dedicated site</a> for these.</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col col--xs-12 col--sm-12 col--md-12 col--lg-12">
                        <h2>Latest Despatches</h2>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  export default {
    name: 'home',

    mounted() {
      document.documentElement.className = 'dark';
    },
  };
</script>

<style lang="scss">
  .large-content {
    font-size: 18px;
  }
</style>
