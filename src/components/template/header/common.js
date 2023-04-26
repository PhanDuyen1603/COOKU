import { ref, onMounted } from 'vue'

export default async function({ menus }) {
  const { $modal, $toast } = useNuxtApp()
  const router = useRouter()

  const search = ref('')

  const handleSearch = () => {
    if(searchString.value.length > 0) router.push('/search?tab=recipe&_q=' + searchString.value)
  }

  return {
    search,
    handleSearch
  }
}