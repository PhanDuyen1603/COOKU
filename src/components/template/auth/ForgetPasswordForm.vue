<template>
  <div>
    <Form class="login__from--wrap" v-slot="observe" ref="loginInfomation" :validation-schema="validationSchema">
      <div class="login-form-group mb-4">
        <label for="name">{{ $t('auth.email') }}</label>
        <div class="input-wrap">
          <Field name="email" v-slot="slotField" >
            <input
              v-model="email"
              v-bind="slotField.field"
              type="text"
              :class="{ 'input-error': slotField.errors?.length }"
            >
          </Field>
          <ErrorMessage class="error-message" name="email" />
        </div>
      </div>

      <button type="button" @click="handleConfirm(observe)" class="btn btn-login">{{ $t('common.confirm') }}</button>
    </Form>
    <div class="login__socials">
      <p>{{ $t('auth.signin_by') }}</p>
      <ul class="icons-social">
        <li>
          <img src="/images/login-facebook.png" alt="login-facebook">
        </li>
        <li>
          <img src="/images/login-google.png" alt="login-google">
        </li>
        <li>
          <img src="/images/login-apple.png" alt="login-apple">
        </li>
      </ul>
    </div>
    <div class="navigate-sign-in">
      <span>
        {{ $t('auth.has_no_account') }}
        <span class="auth-action cursor-pointer" @click="openSignupModal">{{ $t('auth.sign_up') }}</span>
      </span>
    </div>
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

  setup(_, { emit }) {
    const { $modal, $wait } = useNuxtApp()

    const email = ref('')
    const validationSchema = {}

    const handleConfirm = async (observe) => {
      console.log(observe)
    }

    const openSignupModal = async () => {
      emit('close')
      await $wait(200)
      await $modal.show({
        component: 'TemplateAuthModalAuth',
        wrapper: 'ModalWrapperAuthForm',
        wrapperProps: {
          style: {
            width: '900px'
          },
        },
        props: {
          type: 'signup',
        }
      })
    }

    return {
      email,
      validationSchema,

      openSignupModal,
      handleConfirm
    }
  }

}
</script>