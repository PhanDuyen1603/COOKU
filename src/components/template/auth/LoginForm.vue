<template>
  <div>
    <Form class="login__from--wrap" v-slot="observe" ref="loginInfomation" :validation-schema="validationSchema">
      <div class="login-form-group mb-2">
        <label for="name">Tên đăng nhập</label>
        <Field name="name" v-model="name" />
        <ErrorMessage class="error-message" name="name" />
      </div>
      <div class="login-form-group mb-3">
        <label for="password">Mật khẩu</label>
        <Field name="password" v-model="password" />
        <ErrorMessage class="error-message" name="password" />
      </div>
      <div class="form-check mb-2">
        <input type="checkbox" class="form-check-input" id="status" v-model="loginStatus" >
        <label class="form-check-label" for="status">Lưu trạng thái đăng nhập</label>
      </div>

      <button type="button" @click="handleSubmit(observe)" class="btn btn-login">Đăng Nhập</button>
    </Form>
    <div class="forget-pass">
      <span>Quên mật khẩu ?</span>
    </div>
    <div class="login__socials">
      <p>Đăng nhập bằng</p>
      <ul class="icons-social">
        <li>
          <img src="images/login-facebook.png" alt="login-facebook">
        </li>
        <li>
          <img src="images/login-google.png" alt="login-google">
        </li>
        <li>
          <img src="images/login-apple.png" alt="login-apple">
        </li>
      </ul>
    </div>
    <div class="navigate-sign-in">
      <span>
        Bạn chưa có tài khoản?
        <span class="auth-action" @click="openSignupModal">Đăng ký </span>

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
      password: 'required'
    }
    // return {
    //   name: '',
    //   password: '',
    //   loginStatus: false
    // }
  },
  async setup(_, { emit }) {
    const { $modal, $wait } = useNuxtApp()
    const name = ref('')
    const password = ref('')
    const loginStatus = ref(false)

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

    const handleSubmit = async (observe) => {
      const result = await observe.validate()
      if (result.valid) {
        console.log(name, password, loginStatus)
      }
    }

    return {
      openSignupModal,
      handleSubmit,
      name,
      password,
      loginStatus
    }
  },
  methods: {

    // async openSignupModal() {
    //   this.$emit('close')
    //   await this.$wait(200)
    //   await this.$modal.show({
    //     component: 'TemplateAuthModalAuth',
    //     wrapper: 'ModalWrapperAuthForm',
    //     wrapperProps: {
    //       style: {
    //         width: '900px'
    //       },
    //     },
    //     props: {
    //       type: 'signup',
    //     }
    //   })
    // },
    // async handleSubmit(observe) {
    //   const result = await observe.validate()
    //   if (result.valid) {
    //     console.log(this.name, this.password, this.loginStatus)
    //   }
    // }
  }
}
</script>
