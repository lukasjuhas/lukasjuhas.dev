<template>
    <div class="page page--login">
        <div class="container">
            <div class="row">
                <div class="col col--xs-12 col--sm-4 col--md-4 col--lg-4 col--xs-offset-0 col--sm-offset-4 col--md-offset-4 col--lg-offset-4">
                    <h1 class="page__title">Reset Password</h1>
                    <div v-if="showMessage">
                        <p>Check your email for reset password link.</p>
                    </div>
                    <form v-if="!showMessage && !showPasswordForm" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)" class="form">
                        <div class="form__group">
                            <input v-focus v-model="form.email" type="email" name="email" value="" placeholder="Email">
                            <span class="form__note form__note--error" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
                        </div>
                        <div class="form__group">
                            <button type="submit" name="submit" class="button button--primary button--block" :disabled="form.errors.any()">Reset Password</button>
                        </div>
                    </form>
                    <form v-if="showPasswordForm" @submit.prevent="onSubmitPassword" @keydown="passwordForm.errors.clear($event.target.name)" class="form">
                        <div class="form__group">
                            <input v-focus v-model="passwordForm.email" type="email" name="email" value="" placeholder="Email">
                            <span class="form__note form__note--error" v-if="passwordForm.errors.has('email')" v-text="passwordForm.errors.get('email')"></span>
                        </div>
                        <div class="form__group">
                            <input v-model="passwordForm.password" type="password" name="password" value="" placeholder="Password">
                            <span class="form__note form__note--error" v-if="passwordForm.errors.has('password')" v-text="passwordForm.errors.get('password')"></span>
                        </div>
                        <div class="form__group">
                            <input v-model="passwordForm.repassword" type="password" name="repassword" value="" placeholder="Confirm Password">
                            <span class="form__note form__note--error" v-if="passwordForm.errors.has('repassword')" v-text="passwordForm.errors.get('repassword')"></span>
                        </div>
                        <div class="form__group">
                            <button type="submit" name="submit" class="button button--primary button--block" :disabled="passwordForm.errors.any()">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import store from './store';
  export default {
    name: 'reset-password',

    data() {
      return {
        sharedState: store,
        showMessage: false,
        showPasswordForm: false,
        token: false,
        form: new Form({
          email: '',
        }),
        passwordForm: new Form({
          email: '',
          password: '',
          repassword: '',
        })
      }
    },

    mounted() {
      document.documentElement.classList.add('light');
      
      if(this.sharedState.state.router.history.current.query.token) {
        this.token = this.sharedState.state.router.history.current.query.token;
        this.validatePasswordToken();
      }
    },

    methods: {
      onSubmit() {
        this.form.post('/reset-password').then(response => {
          this.showMessage = true;
        });
      },

      onSubmitPassword() {
        this.passwordForm.post('/new-password').then(response => {
          console.log('onSubmitPassword', response);
        });
      },

      validatePasswordToken() {
        axios.post('/validate-password-token', {
          token: this.token,
        }).then(response => {
          if(!response.data.error) {
            this.showPasswordForm = true;
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  //
</style>
