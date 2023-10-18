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

      <div class="login-form-group mb-2">
        <label for="password">{{ $t('auth.password') }} *</label>
        <div class="input-wrap">
          <Field name="password" v-slot="slotField" >
            <input
              v-model="dataSignup.password"
              v-bind="slotField.field"
              :class="{ 'input-error': slotField.errors?.length }"
              :type="showTextPasses.pass ? 'text' : 'password'"
              class="input-password"
            >
            <img src="/icons/eyes.png" alt="eyes" @click="toggleType('pass')">
          </Field>
        </div>
        <ErrorMessage class="error-message" name="password" />
      </div>

      <div class="login-form-group mb-3">
        <label for="password">{{ $t('auth.repeat_password') }} *</label>
        <div class="input-wrap">
          <Field name="passwordRepeat" v-slot="slotField" >
            <input
              v-model="dataSignup.passwordRepeat"
              v-bind="slotField.field"
              :class="{ 'input-error': slotField.errors?.length }"
              :type="showTextPasses.repeat ? 'text' : 'password'"
              class="input-password"
            >
            <img src="/icons/eyes.png" alt="eyes" @click="toggleType('repeat')">
          </Field>
        </div>
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
    return {
      name: '',
      password: '',
      loginStatus: false
    }
  },
  async setup(_, { emit }) {
    const { $modal, $wait, $toast, $get } = useNuxtApp()
    const { register } = useStrapiAuth()
    const router = useRouter()
    const pending = ref(false)


    const SignupValidationSchema = {
      name: 'required',
      email: 'required|email',
      password: 'required',
      passwordRepeat: 'required|confirmed:@password',
    }

    const showTextPasses = reactive({
      pass: false,
      repeat: false
    })

    const dataSignup = reactive({
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    })

    const toggleType = (type) => {
      showTextPasses[type] = !showTextPasses[type]
    }

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
          const message = $get(error, 'message[0].messages[0].message', 'Đã có lỗi xảy ra')
          $toast.show({
            message: message,
            type: 'error'
          })
          pending.value = false
          console.log(error)
        }
      }
    }


    return {
      SignupValidationSchema,
      pending,
      showTextPasses,

      openLoginModal,
      toggleType,

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