<template>
  <div class="form-profile padding-tab">
    <CommonListColorCircle/>
    <div class="my-3 d-flex justify-center">
      <label title="Thay đổi ảnh đại diện" class="margin-center position-relative">
        <div class="avatar-overlay">
          <input type="file" name="profileImage" accept="image/png,image/jpeg" class="hidden" @change="handleUploadImage(item, $event)">
          <img src="/icons/icon-camera.svg" width="32px" height="32px" class="filter-white">
        </div>
        <CommonAvatar size="large" :data="avatarObj" />
      </label>
    </div>

    <div class="mt-3 text-gray text-uppercase fw-bold text-center">
      {{ $t('profile.form.title') }}
    </div>

    <div
      v-for="(value, key) in userDetail"
      :key="key"
      class="mt-4 input-item row"
    >
      <label
        class="fst-italic fw-normal text-start text-gray text-custom-smaller"
        >{{ $t(value.label) }}</label
      >
      <div class="row pr-0 align-items-center">
        <div class="col-11" :class="{ 'active-input': !value.readonly }">
          <input
            v-model="value.input"
            class="mt-1 p-0 border-0 text-custom-small text-gray fw-bold input-custom w-100"
            :disabled="value.readonly"
          />
        </div>
      </div>
    </div>

    <div class="mt-4 input-item row">
      <label
        class="fst-italic fw-normal text-start text-gray text-custom-smaller"
        >{{ $t(birthday.label) }}</label
      >
      <div class="row pr-0 align-items-center">
        <div class="col-12">
          <date-picker
            v-model:value="birthday.input"
            :placeholder="$t('profile.form.no_info')"
            format="YYYY-MM-DD"
            value-type="YYYY-MM-DD"
            class="profile-date-picker"
          ></date-picker>
        </div>
      </div>
    </div>
    <div
      class="btn-success-custom text-center my-4 cursor-pointer"
      @click="changeProfile()"
    >
      {{ $t('action.save') }}
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import dayjs from 'dayjs';

export default {
  components: {
    DatePicker,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userDetail: {
        fullName: {
          label: 'profile.form.label_name',
          readonly: false,
          input: '',
        },
        userName: {
          label: 'profile.form.label_username',
          readonly: true,
          input: '',
        },
        email: {
          label: 'profile.form.label_email',
          readonly: true,
          input: '',
        },
      },
      birthday: {
        label: 'profile.form.label_birthday',
        readonly: true,
        input: null,
      },
      avatar: {},
      isupdateImage: false
    }
  },
  mounted() {
    const user = this.data
    this.userDetail.fullName.input = user.fullname
      ? user.fullname
      : user.username
    this.userDetail.userName.input = user.username
    this.userDetail.email.input = user.email
    this.birthday.input = user.birthday
  },
  computed: {
    avatarObj() {
      if (this.avatar?.id) return { avatar: this.avatar}
      return this.data
    }
  },
  setup() {
    const { update } = useStrapi()
    const client = useStrapiClient()
    const { $$user } = useNuxtApp()

    return {
      strapiUpdate: update,
      strapiClient: client,
      user: unref($$user)
    }
  },
  methods: {
    async changeProfile() {
      const newProfileDetail = {
        fullname: this.userDetail.fullName.input,
        username: this.userDetail.userName.input,
        email: this.userDetail.email.input,
        birthday: this.birthday.input,
      }
      if (this.isupdateImage) newProfileDetail.avatar = this.avatar
      try {
        this.$toast.show({
          message: 'Đang cập nhật thông tin...'
        })
        await this.strapiUpdate(
          'users',
          this.user.id,
          newProfileDetail
        )
        this.$emit('refetch-user')
        this.$toast.show({
          message: 'Cập nhật thông tin thành công',
          type: 'success'
        })
        this.$emit('close')
        window?.location.reload(true)
      } catch (error) {
        this.$toast.show({
          message: error,
          type: 'error'
        })
      }
    },
    async handleUploadImage(item, $event) {
      this.isupdateImage = true
      const file = $event.target.files[0]
      const formData = new FormData()
      formData.append('files', file)
      const response = await this.strapiClient('/upload', { method: 'POST', body: formData })
      const url = this.$$strapi.getStrapiMedia(response[0].url)
      this.avatar = response[0]
      this.avatarUrl = url
      this.isupdateImage = true
    },
    choseDate($event) {
      this.birthday.input = dayjs($event).format('DD-MM-YYYY')

    }
  },
}
</script>

<style lang="scss">
.active-input {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    background: var(--clr-gray-dark);
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
  }
}

.margin-center {
  margin: 0 auto;
  .avatar-overlay {
    opacity: 0;
    visibility: hidden;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    transition: all .2s ease;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    img {
      cursor: pointer;
      width: 32px;
      height: 32px;
    }
  }
  &:hover {
    .avatar-overlay {
      opacity: 1;
      visibility: visible;
    }
  }
}
.form-profile input {
  border: none;
  padding-left: 0;
  box-shadow: unset;
  color: #525f7f;
  font-size: var(--fs-lg);
  line-height: 27px;
  font-weight: 600;
  outline: unset;
}

.profile-date-picker {
  width: 100%;
}
.btn-success-custom {
  padding: 10px 20px;
  color: #fff;
  background-color: var(--clr-orange-primary);
  border-radius: 20px;
  font-size: var(--fs-lg);
  font-weight: 700;
  line-height: 2rem;
}
</style>
