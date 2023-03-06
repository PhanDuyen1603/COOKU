<template>
  <div>
    <Form v-slot="{ validate }" ref="SignupInfomation" :validation-schema="validationSchema">
      <div class="login-form-group mb-2">
        <label for="name">Tên đăng nhập *</label>
        <Field name="name" />
        <ErrorMessage class="error-message" name="name" />
      </div>
      <div class="login-form-group mb-2">
        <label for="email">Email *</label>
        <Field name="email" />
        <ErrorMessage class="error-message" name="email" />
      </div>
      <div class="login-form-group mb-3">
        <label for="password">Mật khẩu *</label>
        <Field name="password" />
        <ErrorMessage class="error-message" name="password" />
      </div>
      <div class="login-form-group mb-3">
        <label for="password_repeat">Nhập lại Mật khẩu *</label>
        <Field name="password_repeat" />
        <ErrorMessage class="error-message" name="password_repeat" />
      </div>

      <button @click="validate()" class="btn btn-login">Đăng Ký</button>
    </Form>
    <div class="navigate-sign-in">
      <span>
        Bạn đã có tài khoản? Đăng nhập
      </span>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  components: {
    Form, Field, ErrorMessage
  },
  data() {
    this.validationSchema = {
      name: 'required',
      password: 'required',
      email: 'required|email'
    }
    return {
      name: '',
      password: '',
      loginStatus: false
    }
  },
}
</script>