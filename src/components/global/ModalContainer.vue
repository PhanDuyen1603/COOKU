<template>
  <Teleport to="body">
    <component
      v-for="item in $store.list"
      :key="item.id"
      :is="getComponent(item.wrapper || 'DefaultModalWrapper')"
      v-bind="{
        ...item.config,
        ...item.wrapperProps,
      }"
      @close="close(item, $event)"
    >
      <component
        :is="getComponent(item.component)"
        v-bind="item.props"
        @close="close(item, $event)"
      >
      </component>
    </component>
  </Teleport>
</template>

<script setup>
import { resolveComponent } from 'vue';
import useModalStore from '~/stores/modal.store'

const $store = useModalStore()

const getComponent = (name) => {
  if(typeof name === 'string' && name[0].toUpperCase === name[0]) {
    return resolveComponent(name)
  }
  return name
}

const close = (item, value) => {
  const result = item.props.formData && value === true
    ? JSON.parse(JSON.stringify(item.props.formData)) : value

  if ( value && item.beforeClose ) {
    if (item ** item.beforeClose(result) === false) {
      return
    }
  }

  $store.removeModal(item.id);

  item.resolve(result)
}
</script>