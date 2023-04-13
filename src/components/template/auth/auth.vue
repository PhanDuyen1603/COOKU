<script>
export default {
  async setup(_, { emit }) {
    const { $modal, $wait, $toast } = useNuxtApp()
    const { login, register } = useStrapiAuth()

    const loginValidationSchema = {
      name: 'required',
      password: 'required'
    }

    const SignupValidationSchema = {
      name: 'required',
      email: 'required|email',
      password: 'required',
      passwordRepeat: 'required',
    }

    const dataLogin = reactive({
      name: '',
      password: '',
      loginStatus: false
    })

    const dataSignup = reactive({
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    })

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

    const handleLogin = async (observe) => {
      const result = await observe.validate()
      if (result.valid) {
        try {
          await login({ identifier: dataLogin.name, password: dataLogin.password })
          $toast.show({
            message: 'đăng nhập thành công',
            type: 'success'
          })
          emit('close')
        } catch (error) {
          $toast.show({
            message: error
          })
          console.log(error)
        }

      }
    }

    const handleSignup = async (observe) => {
      const result = await observe.validate()
      if(result.valid) {
        try {
          await register({ username: dataSignup.name, email: dataSignup.email, password: dataSignup.password })
          $toast.show({
            message: 'đăng ký thành công',
            type: 'success'
          })
          emit('close')
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
      loginValidationSchema,
      SignupValidationSchema,

      openSignupModal,

      handleLogin,
      handleSignup,

      dataLogin,
      dataSignup
    }
  },
}
</script>