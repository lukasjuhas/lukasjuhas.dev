<template>
    <div class="page page--login">
        <div class="container">
            <div class="row">
                <div class="col col--xs-12 col--sm-4 col--md-4 col--lg-4 col--xs-offset-0 col--sm-offset-4 col--md-offset-4 col--lg-offset-4">
                    <h1 class="page__title">Login</h1>
                    <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)" class="form">
                        <div class="form__group">
                            <input v-model="form.email" type="email" name="email" value="" placeholder="Email">
                            <span class="form__note form__note--error" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
                        </div>
                        <div class="form__group">
                            <input  v-model="form.password" type="password" name="password" value="" placeholder="Password">
                            <span class="form__note form__note--error" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
                        </div>
                        <div class="form__group">
                            <button type="submit" name="submit" class="button button--primary button--block" :disabled="form.errors.any()">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'login',

    data() {
      return {
        form: new Form({
            email: '',
            password: '',
        }),
        errors: new Errors(),
      }
    },

    methods: {
      onSubmit() {
        this.form.post('/login')
            .then(response => {
              console.log(response);
            });
      }
    }
  };
</script>

<style lang="scss">
  //
</style>
