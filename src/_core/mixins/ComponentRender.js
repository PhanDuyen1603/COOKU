import { h, defineAsyncComponent, resolveComponent } from 'vue';

export default {
  props: {
    instanceId: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String
    }
  },
  render() {
    const type = this.type
    const TYPES = this.TYPES

    if(!TYPES) {
      console.error('Missing TYPES definition');
      return h('div', {}, 'Missing TYPES !')
    }

    const props = {
      ...this.$data,
      ...this.$props,
      ...this.renderProps,
      instanceId: this.instanceId || this.$props.instanceId || Math.random().toString() || 0,
    }
    const componentName = TYPES[type] || TYPES[Object.keys(TYPES)[0]]
    const component = h(
     typeof componentName == 'string' ? resolveComponent(componentName) : defineAsyncComponent(componentName), // Use first component type by default
    {
      key: +new Date(),
      ...props,
      ref: 'rendered',
      ...this.$prop,
      on: { ...this.componentEvents },
    }, this.$slots)

    return h('div', {
      key: +new Date(),
      class: this.className || '',
    }, [component])
  }
}