<template>
  <div class="row auth">
    <div class="col-12 col-md-6 login__image">
      <div class="auth__image--wrap">
        <img src="/images/login-theme.png" alt="">
      </div>
    </div>
    <div class="col-12 col-md-6 auth__form">
      <div class="auth__title">
        <p>COOKU</p>
        <h2>{{ $t(formContent?.[0].title) }}</h2>
      </div>
      <div class="line__dash"></div>
      <div class="auth__form--content">
        <component :is="getComponent(formContent?.[0]?.component)" @close="$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import { resolveComponent } from 'vue'

const authForms = [
  {
    title: 'auth.sign_in',
    slug: 'login',
    component: 'TemplateAuthLoginForm',
  },
  {
    title: 'auth.create_account',
    slug: 'signup',
    component: 'TemplateAuthSignupForm',
  },
  {
    title: 'auth.forget_password',
    slug: 'forget_password',
    component: 'TemplateAuthForgetPasswordForm',
  },
  {
    title: 'auth.change_password',
    slug: 'change_password',
    component: 'TemplateAuthChangePasswordForm',
  },
]

export default {
  props: {
    type: {
      type: String,
      default: 'login'
    }
  },
  computed: {
    formContent() {
      return authForms.filter(x => this.type === x.slug)
    }
  },
  methods: {
    getComponent(name) {
      return resolveComponent(name)
    }
  }
}
</script>