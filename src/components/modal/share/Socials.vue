<template>
  <div class="pop-share-wrapper">
    <h3 class="pop-share-title">
      Share Link
    </h3>
    <ul class="pop-socials-list">
      <li>
        <a
          aria-label="Share on Facebook"
          :href="facebookUrl"
          target="_blank"
          className="pop-share-icon pop-share-icon-fb"
        >
          <img src="/icons/facebook-circle.svg" alt="facebook">
        </a>
      </li>
      <li>
        <a
          aria-label="Share on Twitter"
          :href="twitterUrl"
          target="_blank"
          className="pop-share-icon pop-share-icon-twitter"
        >
          <img src="/icons/twitter-circle.svg" alt="twitter">
        </a>
      </li>
      <li>
        <a
          aria-label="Share on Pinterest"
          :href="pinterestUrl"
          target="_blank"
          className="pop-share-icon pop-share-icon-pinterest"
        >
          <img src="/icons/pinterest.svg" alt="pinterest">
        </a>
      </li>
    </ul>
    <div class="pop-share-input">
      <input v-model="url" readonly type="text" ref="pureUrl">
      <button class="pop-share-url-btn" @click="handleShare">Copy Link</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    pageType: {
      type: String
    }
  },
  data() {
    return {
      url: '',
      facebookUrl: '',
      pinterestUrl: '',
      twitterUrl: ''
    }
  },
  computed: {
    slug() {
      if(this.$route.params?.slug) return this.$route.params.slug
      return this.item.slug || 'error'
    }
  },
  mounted() {
    var protocol = location.protocol;
    var slashes = protocol.concat("//");
    var host = slashes.concat(window.location.host);
    const URL = `${host}/${this.pageType}/${this.slug}`
    this.facebookUrl = `https://www.facebook.com/sharer.php?u=${URL}`
    this.pinterestUrl = `http://pinterest.com/pin/create/button/?url=${URL}`
    this.twitterUrl = `http://twitter.com/share?text=${this.slug}&url=${URL}`
    this.url = URL
  },
  methods: {
    handleShare() {
      this.$refs.pureUrl.select()
      document.execCommand('copy')
      this.$toast.show({
        message: 'Đã sao chép link bài đăng'
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.pop-share-wrapper {
  --elm-clr: var(--clr-orange-primary);
  --elm-rounded: 20px;
  --elm-vertical-space: 30px;
}

.pop-share-title {
  font-size: var(--fs-lg);
  font-weight: 700;
  margin-bottom: var(--elm-vertical-space);
}
.pop-socials-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: var(--elm-vertical-space);
}
.pop-share-input {
  padding: 10px;
  width: 100%;
  border-radius: var(--elm-rounded);
  border: 1px solid var(--elm-clr);

  display: flex;
  justify-content: space-between;

  button {
    border-radius: var(--elm-rounded);
    border-color: var(--elm-clr);
    background-color: var(--elm-clr);
    color: #fff;
    width: 100px;
  }

  input {
    outline: unset;
    border-radius: var(--elm-rounded);
    border: none;
    width: calc(100% - 100px);
    &:focus {
      background-color: inherit;
    }
  }
}
</style>