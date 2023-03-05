<template>
  <div>
    <content-loader
      :width="containerWidth"
      :height="300"
      :speed="2"
      primary-color="#f3f3f3"
      secondary-color="#ecebeb"
    >
      <rect v-for="(item, index) in itemsToShow" :key="'top_'+item"
        :x="index === 0 ? 0 : (getitemWidth + defaultLayout.itemSpacing) * index "
        y="20" rx="8" ry="8" :width="getitemWidth" height="200"
      />

      <rect v-for="(item, index) in itemsToShow" :key="'body_'+item"
        :x="index === 0 ? 0 : (getitemWidth + defaultLayout.itemSpacing) * index "
        y="250" rx="0" ry="0" :width="getitemWidth" height="18"
      />

      <rect v-for="(item, index) in itemsToShow" :key="'footer_'+item"
        :x="index === 0 ? 0 : (getitemWidth + defaultLayout.itemSpacing) * index "
        y="275" rx="0" ry="0" :width="getitemWidth - 80" height="20"
      />

    </content-loader>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
const defaultLayout = {
  itemSpacing: 20
}
export default {
  components: { ContentLoader },
  props: {
    itemsToShow: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      defaultLayout
    }
  },
  computed: {
    containerWidth() {
      return 1280
    },
    getitemWidth() {
      return (this.containerWidth / this.itemsToShow) - defaultLayout.itemSpacing
    }
  }
}
</script>
