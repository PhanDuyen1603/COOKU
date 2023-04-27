
<template>
  <div class="time-picker">
    <div class="picker-group d-flex">
    <VueScrollPicker :modelValue="currentHours" @update:modelValue="updateHours" :options="hours" />
    <VueScrollPicker :modelValue="textHours" :options="['Giờ']" />
    <VueScrollPicker :modelValue="currentMinutes" @update:modelValue="updateMinutes" :options="minutes" />
    <VueScrollPicker :modelValue="textMinutes" :options="['Phút']" />
    </div>
    <div class="d-flex justify-content-center">
      <div
        class="button-add text-center px-4 py-2"
        type="button"
        @click="confirm"
      >
        Xác nhận
      </div>
    </div>
  </div>
</template>

<script>
import { VueScrollPicker } from 'vue-scroll-picker'
import "vue-scroll-picker/lib/style.css"

export default {
  name: 'TimePicker',
  components: {
    VueScrollPicker
  },
  props: {
    hour: {
      type: Number,
      default: 1
    },
    minute: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      textHours: "Giờ",
      textMinutes: "Phút",
      showPicker: true,
    }
  },
  computed: {
    hours() {
      const arr = []
      for (let i = 0; i <= 23; i++) {
        arr.push(i)
      }
      return arr
    },
    minutes() {
      const arr = []
      for (let i = 0; i <= 59; i++) {
        arr.push(i)
      }
      return arr
    },
  },
  setup(props, { emit }) {
    const currentHours = ref(props.hour)
    const currentMinutes = ref(props.minute)

    const updateHours = ($event) => {
      currentHours.value = $event
    }
    const updateMinutes = ($event) => {
      currentMinutes.value = $event
    }
    const confirm = () => {
      emit('close', { hours: currentHours.value, minutes: currentMinutes.value })
    }

    return {
      currentHours,
      currentMinutes,

      confirm,
      updateHours,
      updateMinutes
    }
  },
}
</script>
<style scoped>
.time-picker {
  z-index: 9999;
}
</style>