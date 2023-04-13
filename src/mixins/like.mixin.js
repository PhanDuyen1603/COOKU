import { ref, onMounted, reactive } from "vue";

export default async function({ postData, type }) {
  const isLiked = ref(false);
  const likeCount = ref(0);
  const pendingLike = ref(false)
  const infoLike = reactive({})

  const { find, count, create, delete: _delete } = useStrapi()
  const { $$user, $toast, $modal } = useNuxtApp()

  onMounted(async () => {
    try {
      likeCount.value = await count('likes', { [type]: postData.id })
      if(unref($$user)) {
        const results = await find('likes', { author: unref($$user).id, [type]: postData.id })
        if(results?.length) {
          isLiked.value = true
          // TODO: performance
          const item = results?.[0]
          const keys = Object.keys(item)
          keys.map(x => infoLike[x] = item[x])
        } else {
          isLiked.value = false
        }
      }
    } catch (error) {
      console.log('like', error)
    }
  })

  const toggleLikePost = async () => {
    if(!pendingLike.value && unref($$user)) {
      pendingLike.value = true
      try {
        if(!isLiked.value) {
          likeCount.value = likeCount.value + 1
          isLiked.value = true
          await create('likes', { author: unref($$user).id, [type]: postData.id })
          const results = await find('likes', { author: unref($$user).id, [type]: postData.id })
          // TODO: performance
          const item = results?.[0]
          const keys = Object.keys(item)
          keys.map(x => infoLike[x] = item[x])
        } else {
          isLiked.value = false
          likeCount.value = likeCount.value - 1
          await _delete('likes', infoLike.id)
          // infoLike = {}
        }
        pendingLike.value = false
      } catch (error) {
        pendingLike.value = false
        $toast.show({
          message: 'Đã có lỗi xảy ra vui lòng thử lại',
          type: 'error'
        })
        console.log(error);
      }
    } else {
      $toast.show({ message: 'Bạn cần đăng nhập trước' })
      await $modal.show({
        component: 'TemplateAuthModalAuth',
        wrapper: 'ModalWrapperAuthForm',
        wrapperProps: {
          style: {
            width: '900px'
          },
        }
      })
    }
  }

  return {
    likeCount,
    isLiked,
    pendingLike,
    infoLike,

    toggleLikePost
  }
}