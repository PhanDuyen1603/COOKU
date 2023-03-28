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
    const { delete: _delete } = useStrapi()

    return {
      _delete
    }
  },

  methods: {
    openAddRecipeModal() {
      if(this.$strapi.user) {
        this.$emit('open-modal', this.item, 'recipe', "Món ăn")
      } else {
        this.$toast.error('Bạn phải đăng nhập trước khi tạo bộ sưu tập')
        this.$store.dispatch('modules/app/changeModeForm', 'login')
        this.$store.dispatch('modules/app/changeFormStatus', true)
      }
    },

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
      await this.$modal.show({
        component: 'add',
        props: {
          data: this.data
        }
      })
    }
  },
}