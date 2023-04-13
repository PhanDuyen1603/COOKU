export default {
  props: {
    data: {
      type: Object,
      default:() => {},
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    pid: {
      type: String,
    },
    modelValue: {
      type: [String, Number, Object, Array],
    },
    pageType: {
      type: String,
      default: 'recipe'
    }
  },
};
