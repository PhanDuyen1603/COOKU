<template>
  <div class="padding-tab">
    <CommonListColorCircle/>
    <div class="mt-2">
      <label title="Thay đổi ảnh đại diện" class="rounded-circle fit-image-wrapper avatar--large margin-center">
        <div class="object-fit avatar-overlay">
          <input type="file" name="profileImage" accept="image/png,image/jpeg" class="hidden" @change="handleUploadImage(item, $event)">
          <img src="/icons/icon-camera.svg" width="32px" height="32px" class="filter-white">
        </div>
        <CommonAvatar size="large" :data="data" />
      </label>
    </div>

    <div class="mt-3 text-gray text-uppercase fw-bold info-name">
      THÔNG TIN CÁ NHÂN
    </div>

    <div
      v-for="(value, key) in userDetail"
      :key="key"
      class="mt-4 input-item row"
    >
      <label
        class="fst-italic fw-normal text-start text-gray text-custom-smaller"
        >{{ value.label }}</label
      >
      <div class="row pr-0 align-items-center">
        <div class="col-11" :class="{ 'active-input': !value.readonly }">
          <input
            :ref="key"
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
        >{{ birthday.label }}</label
      >
      <div class="row pr-0 align-items-center">
        <div class="col-12">
          <date-picker
            v-model:value="birthday.input"
            placeholder="Chưa có thông tin"
            format="DD-MM-YYYY"
            class="profile-date-picker"
          ></date-picker>
        </div>
      </div>
    </div>
    <div
      class="btn w-100 mt-3 text-white fw-bold border-radius-20 bg-yelow text-custom btn-success-custom"
      @click="changeProfile()"
    >
      Lưu
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import dayjs from 'dayjs'

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
          label: 'Họ tên',
          readonly: false,
          input: '',
        },
        userName: {
          label: 'User name',
          readonly: true,
          input: '',
        },
        email: {
          label: 'Email',
          readonly: true,
          input: '',
        },
      },
      birthday: {
        label: 'Sinh nhật',
        readonly: true,
        input: '',
      },
      avatar: null,
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
  setup() {
    const { update } = useStrapi()
    const client = useStrapiClient()
    return {
      strapiUpdate: update,
      strapiClient: client
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
          this.$$user.id,
          newProfileDetail
        )
        this.$emit('refetch-user')
        this.$toast.show({
          message: 'Cập nhật thông tin thành công'
        })
        this.$emit('close')
      } catch (error) {
        this.$toast.show({
          message: error
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
    },
    choseDate($event) {
      this.birthday.input = dayjs($event).format('DD-MM-YYYY')

    }
  },
}
</script>

<style lang="scss" scoped>
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
    img {
      margin-top: 22px;
      cursor: pointer;
    }
  }
  &:hover {
    .avatar-overlay {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
