<template>
  <div>
    <Form class="login__from--wrap" v-slot="observe" ref="loginInfomation" :validation-schema="validationSchema">
      <div class="login-form-group mb-2">
        <label for="name">{{ $t('auth.username') }}</label>
        <div class="input-wrap">
          <Field name="tên đăng nhập" v-slot="slotField" >
            <input
              v-model="dataLogin.name"
              v-bind="slotField.field"
              type="text"
              :class="{ 'input-error': slotField.errors?.length }"
            >
          </Field>
          <ErrorMessage class="error-message" name="tên đăng nhập" />
        </div>
      </div>
      <div class="login-form-group mb-3">
        <label for="password">{{ $t('auth.password') }}</label>
        <div class="input-wrap">
          <Field name="mật khẩu" v-slot="slotField" >
            <input
              v-model="dataLogin.password"
              v-bind="slotField.field"
              :class="{ 'input-error': slotField.errors?.length }"
              :type="passwordText ? 'tex' : 'password'"
              class="input-password"
            >
            <img src="/icons/eyes.png" alt="eyes" @click="toggleType">
          </Field>
        </div>
        <ErrorMessage class="error-message" name="mật khẩu" />
      </div>
      <div class="form-check mb-2">
        <input type="checkbox" class="form-check-input" id="status" v-model="dataLogin.loginStatus" >
        <label class="form-check-label" for="status">{{ $t('auth.save_login_status') }}</label>
      </div>

      <button type="button" @click="handleLogin(observe)" class="btn btn-login">{{ $t('auth.sign_in') }}</button>
    </Form>
    <div class="forget-pass cursor-pointer" @click="openModalForgetPassword">
      <span>{{ $t('auth.forget_password') }}</span>
    </div>
    <div class="login__socials">
      <p>{{  $t('auth.signin_by') }}</p>
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
  data() {
    this.validationSchema = {
      ['tên đăng nhập']: 'required',
      ['mật khẩu']: 'required'
    }
  },
  async setup(_, { emit }) {
    const { $modal, $wait, $toast } = useNuxtApp()
    const { login } = useStrapiAuth()
    const router = useRouter()

    const dataLogin = reactive({
      name: '',
      password: '',
      loginStatus: false
    })

    const passwordText = ref(false)

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

    const openModalForgetPassword = async () => {
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

    const handleLogin = async (observe) => {
      const result = await observe.validate()
      if (result.valid) {
        try {
          const { user } = await login({ identifier: dataLogin.name, password: dataLogin.password })
          emit('close')
          $toast.show({
            message: 'đăng nhập thành công',
            type: 'success'
          })
          await $wait(1000)
          await router.push({ name: 'profile-slug', params: { slug: unref(user).username } })
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

    const toggleType = () => {
      passwordText.value = !passwordText.value
    }
    return {
      openSignupModal,
      handleLogin,
      toggleType,
      openModalForgetPassword,
      dataLogin,
      passwordText
    }
  },

}
</script>