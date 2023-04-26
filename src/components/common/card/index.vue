

<script>
import ComponentRender from '~/_core/mixins/ComponentRender';

const TYPES = {
  Horizonal: 'CommonCardHorizonal',
  Vertical: 'CommonCardVertical',
  FullImage: 'CommonCardFullImage'
}

export default {
  mixins: [ComponentRender],

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

  data() {
    this.TYPES = { ...TYPES, ...this.TYPES}
    return { }
  },

}
</script>