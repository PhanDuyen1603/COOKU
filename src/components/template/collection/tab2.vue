s<template>
  <div>
    <Form ref="infoSubmit">
      <CommonListColorCircle :validation-schema="validationSchema" />
      <div class>
        <div class="fw-bold mt-2 text-center text-custom-title">
          {{ $t('action.create') }} {{ $t('collection') }}
        </div>
        <div class="mt-2 mb-2 text-gray">{{ title }}</div>
      </div>

      <div class="bg-shadow-while mt-1 padding-page position-relative">
        <Field v-slot="{ errors, field }" name="collectionName" rules="required">
          <div class="input-text-wrap">
            <input
              v-bind="field"
              v-model="name"
              name="collectionName"
              type="text"
              :placeholder="`${$t('common.name')} ${$t('collection')} *`"
              class="input-texts"
            />
          </div>
          <span class="error-red">{{ errors[0] }}</span>
        </Field>
        <div class="input-text-wrap texts-area mb-3">
          <textarea
            v-model="desc"
            class="input-texts"
            :placeholder="$t('common.description')"
            cols="4"
            rows="4"
          ></textarea>
        </div>

        <div class="mt-4">
          <div class="fw-light text-start">{{ $t('collection.show_type') }}</div>
          <div class="d-flex justify-content-between">
            <div class="fw-bold text-mid">{{ $t('collection.personal_keep') }}</div>

           <div class="btn-toggle border-radius-40"
            :class="{'btn-toggle-check': is_public}"
            @click="is_public = !is_public"
          >
            <div class="icon-private">
              <img src="/icons/lock.png" />
            </div>
            <span>{{ is_public ? $t('collection.public') : $t('collection.personal') }}</span>
          </div>


          </div>
          <div
            class="mt-2 text-start fw-lighter text-dark-gray sub-title-custom"
          >
            {{ $t('collection.switch_public_type') }}
          </div>
        </div>

        <div v-if="loading" class="loading">
          <div class="section-overlay"></div>
          <span
            role="status"
            class="spinner-border spinner-border-sm"
          >

            <span class="visually-hidden">Loading...</span>
          </span>
        </div>

      </div>

      <div class="content-footer my-3">
        <div>
          <div
            class="btn btn-rounded fw-bold text-yellow btn-outline-secondary collection-btn"
            :class="`btn-${type}`"
            @click="submit"
          >
            {{ $t('collection.action.create_new') }}
          </div>
        </div>
      </div>

    </Form>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  components: {
    Form, Field, ErrorMessage
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    this.validationSchema = {
      collectionName: 'required'
    }
    return {
      items: [],
      name: '',
      is_public: true,
      desc: '',
      loading: false,
    }
  },
  setup(props, { emit }) {
    const { create } = useStrapi()
    const { $toast } = useNuxtApp()

    const postData = async (formData) => {
      try {
        $toast.show({
          message: 'dang tao bst'
        })
        const res = await create('collections', formData)
        $toast.show({
          message: 'tao bst thanh cong',
          type: 'success'
        })
        return res

      } catch (error) {
        console.log(error)
        return false
      }
    }

    return {
      postData
    }
  },
  methods: {
    async submit() {
      this.loading = false
      const result = await this.$refs.infoSubmit.validate()
      if(result.valid) {
        const formData = {
          content: this.desc,
          is_default: true,
          is_public: this.is_public,
          name: this.name,
          type: this.type,
          recipes: [],
          tips: [],
          posts: [],
          author: unref(this.$$user),
        }
        formData[this.type + 's'] = [this.item]
        const res = await this.postData(formData)
        if(res) this.$emit('successStep', res)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.text-custom-title {
  font-size: 2rem;
}
body {
    font-family: sans-serif;
    font-weight: 800;
    background: #eee;
  }
  .switch {
    position: relative;
    width: 200px;
    height: 50px;
    text-align: center;
    background: #df8c25;
    transition: all 0.2s ease;
    border-radius: 25px;
  }
  .switch span {
    position: absolute;
    width: 20px;
    height: 4px;
    top: 50%;
    left: 50%;
    margin: -2px 0px 0px -4px;
    background: #fff;
    display: block;
    transform: rotate(-45deg);
    transition: all 0.2s ease;
  }
  .switch span:after {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 12px;
    margin-top: -8px;
    background: #fff;
    transition: all 0.2s ease;
  }
  input[type=radio] {
    display: none;
  }
  .switch label {
    cursor: pointer;
    color: rgba(0,0,0,0.2);
    width: 90px;
    line-height: 50px;
    transition: all 0.2s ease;
  }
  label[for=true] {
    position: absolute;
    left: 0px;
    height: 20px;
  }
  label[for=false] {
    position: absolute;
    right: 0px;
  }
  #false:checked ~ .switch {
    background: #eb4f37;
  }
  #false:checked ~ .switch span {
    background: #fff;
    margin-left: -8px;
  }
  #false:checked ~ .switch span:after {
    background: #fff;
    height: 20px;
    margin-top: -8px;
    margin-left: 8px;
  }
  #true:checked ~ .switch label[for=true] {
    color: #fff;
  }
  #false:checked ~ .switch label[for=false] {
    color: #fff;
  }

.section-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .5;
}
.spinner-border {
  position: absolute;
  top: 50%;
}
.input-texts {
  width: 100%;
}
.btn-toggle {
  --elm-bg: var(--clr-orange-primary);
  --elm-width: 110px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  background-color: var(--elm-bg);
  border-radius: 40px;
  width: var(--elm-width);
  cursor: pointer;
  span {
    transition: .2s all ease;
    font-size: var(--fs-sm);
    color: #fff;
    padding: 0 5px;
  }
  .icon-private {
    transition: .2s all ease;
    width: 25px;
    height: 25px;
  }

  &-check {
    .icon-private {
      transform: translateX(110px - 35px);
    }
    span {
      transform: translateX(-30px);
    }
  }

}
</style>
