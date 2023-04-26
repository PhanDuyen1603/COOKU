<script>
import ComponentRender from '~/_core/mixins/ComponentRender';

const TYPES = {
  default: 'TemplateHeaderDefault',
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