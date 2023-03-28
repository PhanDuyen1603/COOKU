<template>
  <div class="add-collection">
    <TemplateCollectionTab1
      v-if="step === 'step1'"
      ref="step1"
      :title="title"
      :type="type"
      :item="item"
      :collections="collections"
      @next-step="nextStep"
      @success-step="successStep"
    />
    <LazyTemplateCollectionTab2
      v-if="step === 'step2'"
      ref="step2"
      :item="item"
      :title="title"
      :type="type"
      @success-step="successStep"
    />
    <LazyTemplateCollectionTab3
      v-if="step === 'step3'"
      ref="step3"
      :title="title"
      :collection="collection"
      :item="item"
      :type="type"
    />
  </div>
</template>


<script>
export default {
  props: {
    data: {
      type: Object,
      default:() => {}
    },
    // eslint-disable-next-line vue/require-default-prop
    item: {
      type: [Array, Object],
    },
    type: {
        type: String,
        default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    components: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      step: 'step1',
      collection: {},
    }
  },

  async setup(props) {
    const { $$user } = useNuxtApp()
    const { find } = useStrapi()
    const filters = {
      'author.username': unref($$user)?.username || '',
      'is_public': true
    }
    const collections = await find('collections', filters)

    return {
      collections
    }
  },

  methods: {
    closeModal() {
      this.$emit('close')
      this.step = 'step1';
    },
    nextStep(){
      this.step = 'step2';
    },
    successStep(event){
      const self = this
      this.step = 'step3';
      this.collection = event
      setTimeout(() => {
        self.closeModal()
      }, 2000);
    }
  },
}
</script>