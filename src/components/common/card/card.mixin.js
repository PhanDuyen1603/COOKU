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

  setup(props) {
    const { delete: _delete, find } = useStrapi()

    return {
      _delete,
      find
    }
  },

  methods: {
    editItem() {
      this.$router.push({ name: `${this.pageType}-create`, params: { slug: this.data.slug }})
    },
    async removeItem() {
      const res = await this.$modal.confirm({
        message: `Bạn có chắc muốn xoá ${this.pageType} này`
      })
      if(res) {
        try {
          await this.$toast.show({
            message: 'đang xoá ....'
          })
          this._delete(this.pageType + 's', this.data.id)
          await this.$toast.show({
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
        await this.$toast.show({
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