<template>
  <div>
    <Form class="login__from--wrap" v-slot="observe" ref="loginInfomation" :validation-schema="validationSchema">
      <div class="login-form-group mb-2">
        <label for="name">{{ $t('auth.new_password') }}</label>
        <div class="input-wrap">
          <Field name="Mật khẩu mới" v-slot="slotField" >
            <input
              v-model="dataLogin.name"
              v-bind="slotField.field"
              type="password"
              :class="{ 'input-error': slotField.errors?.length }"
            >
          </Field>
          <ErrorMessage class="error-message" name="Mật khẩu mới" />
        </div>
      </div>
      <div class="login-form-group mb-2">
        <label for="name">{{ $t('auth.confirm_password') }}</label>
        <div class="input-wrap">
          <Field name="Xác nhận mật khẩu" v-slot="slotField" >
            <input
              v-model="dataLogin.name"
              v-bind="slotField.field"
              type="text"
              :class="{ 'input-error': slotField.errors?.length }"
            >
          </Field>
          <ErrorMessage class="error-message" name="Xác nhận mật khẩup" />
        </div>
      </div>

      <button type="button" @click="handleConfirm(observe)" class="btn btn-login">{{ $t('common.confirm') }}</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import auth from './auth.vue';

export default {
  extends: auth,
  components: {
    Form, Field, ErrorMessage
  },


}
</script>
<style lang="scss">
.input-wrap {
  position: relative;
  img {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>