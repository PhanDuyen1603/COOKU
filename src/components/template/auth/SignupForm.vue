<template>
  <div>
    <Form v-slot="observe" ref="SignupInfomation" :validation-schema="SignupValidationSchema">
      <div class="login-form-group mb-2">
        <label for="name">Tên đăng nhập *</label>
        <Field name="name" v-model="dataSignup.name" />
        <ErrorMessage class="error-message" name="name" />
      </div>
      <div class="login-form-group mb-2">
        <label for="email">Email *</label>
        <Field name="email" v-model="dataSignup.email"/>
        <ErrorMessage class="error-message" name="email" />
      </div>
      <div class="login-form-group mb-3">
        <label for="password">Mật khẩu *</label>
        <Field name="password" v-model="dataSignup.password" />
        <ErrorMessage class="error-message" name="password" />
      </div>
      <div class="login-form-group mb-3">
        <label for="password_repeat">Nhập lại Mật khẩu *</label>
        <Field name="password_repeat" v-model="dataSignup.passwordRepeat"/>
        <ErrorMessage class="error-message" name="password_repeat" />
      </div>

      <button type="button" @click="handleSignup(observe)" class="btn btn-login">Đăng Ký</button>
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
  async setup(_, { emit }) {
    const { $modal, $wait, $toast } = useNuxtApp()
    const { register } = useStrapiAuth()

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
      })
    }

    const handleSignup = async (observe) => {
      const result = await observe.validate()
      if(result.valid) {
        try {
          await register({ username: dataSignup.name, email: dataSignup.email, password: dataSignup.password })
          await $toast.show({
            message: 'đăng ký thành công'
          })
          emit('close')
        } catch (error) {
          await $toast.show({
            message: error
          })
          console.log(error)
        }
      }
    }


    return {
      SignupValidationSchema,

      openLoginModal,

      handleSignup,

      dataSignup
    }
  },
}
</script>