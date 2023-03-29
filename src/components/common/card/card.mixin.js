export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    pageType: {
      type: String,
      default: '',
    },
    isEditable: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    navigateTo() {
      if(!this.pageType) return '#'
      return { name: this.pageType + '-slug', params: { slug: this.data.slug || 'error' } }
    },
  },

  methods: {
    editItem() {
      this.$router.push({ name: `${this.pageType}-update-slug`, params: { slug: this.data.slug }})
    },
    async removeItem() {
      const res = await this.$modal.confirm({
        message: `Bạn có chắc muốn xoá ${this.pageType} này`
      })
      if(res) {
        try {
          this.$toast.show({
            message: 'đang xoá ....'
          })
          await this.$$strapi._delete(this.pageType + 's', this.data.id)
          this.$toast.show({
            message: 'Xoá thành công'
          })
          this.$emit('refetch')
        } catch (error) {
          console.log(error)
        }
      }
    },
    async bookMark() {
      if(!this.$$isSigned) {
        this.$toast.show({
          message: 'vui lòng đăng nhập để tạo bst'
        })
        return this.$modal.show({
          component: 'TemplateAuthModalAuth',
          wrapper: 'ModalWrapperAuthForm',
          wrapperProps: {
            style: {
              width: '900px'
            },
          }
        })
      }
      await this.$modal.show({
        component: 'TemplateCollectionPopAddCollection',
        props: {
          item: this.data,
          type: this.pageType
        },
        wrapperProps: {
          maxWidth: '750px'
        }
      })
    }
  },
}