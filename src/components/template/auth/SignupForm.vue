<template>
  <div>
    <Form v-slot="observe" ref="SignupInfomation" :validation-schema="SignupValidationSchema">
      <div class="login-form-group mb-2">
        <label for="name">{{ $t('auth.username') }} *</label>
        <Field name="name" v-model="dataSignup.name" />
        <ErrorMessage class="error-message" name="name" />
      </div>
      <div class="login-form-group mb-2">
        <label for="email">{{ $t('auth.email') }} *</label>
        <Field name="email" v-model="dataSignup.email"/>
        <ErrorMessage class="error-message" name="email" />
      </div>
      <div class="login-form-group mb-3">
        <label for="password">{{ $t('auth.password') }} *</label>
        <Field name="password" v-model="dataSignup.password" />
        <ErrorMessage class="error-message" name="password" />
      </div>
      <div class="login-form-group mb-3">
        <label for="passwordRepeat">{{ $t('auth.repeat_password') }} *</label>
        <Field name="passwordRepeat" v-model="dataSignup.passwordRepeat"/>
        <ErrorMessage class="error-message" name="passwordRepeat" />
      </div>

      <button
        type="button"
        @click="handleSignup(observe)"
        class="btn btn-login"
        :class="pending ? 'button-loading' : ''"
      >{{ $t('auth.sign_up') }}</button>
    </Form>
    <div class="navigate-sign-in mt-2">
      <span>
        {{ $t('auth.has_account') }}
        <span class="auth-action cursor-pointer" @click="openLoginModal">{{ $t('auth.sign_in') }} </span>
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
  async setup(_, { emit }) {
    const { $modal, $wait, $toast } = useNuxtApp()
    const { register } = useStrapiAuth()
    const router = useRouter()
    const pending = ref(false)


    const SignupValidationSchema = {
      name: 'required',
      email: 'required|email',
      password: 'required',
      passwordRepeat: 'required',
    }

    const dataSignup = reactive({
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    })

    const openLoginModal = async () => {
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
          type: 'forget_password',
        }
      })
    }

    const handleSignup = async (observe) => {
      pending.value = true
      const result = await observe.validate()
      if(result.valid) {
        try {
          await register({ username: dataSignup.name, email: dataSignup.email, password: dataSignup.password })
          $toast.show({
            message: 'đăng ký thành công',
            type: 'success'
          })
          emit('close')
          window?.location.reload(true)
        } catch (error) {
          $toast.show({
            message: 'Đã có lỗi xảy ra',
            type: 'error'
          })
          console.log(error)
        }
      }
    }


    return {
      SignupValidationSchema,
      pending,

      openLoginModal,

      handleSignup,

      dataSignup
    }
  },
}
</script>

<style lang="scss">
.button-loading {
  position: relative;
  pointer-events: none;
  &::after {
    content: '';
    position: absolute;
    background-color: #000;
    opacity: .3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

}
</style>