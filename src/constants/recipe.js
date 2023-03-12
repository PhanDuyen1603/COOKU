export const categories = [
  {
    id: 1,
    featured_media: {
      url: '/images/nguyen-lieu.jpg'
    },
    subTitle: "Gà, cải thảo, mì gói, bông bí...",
    title: 'Nguyên liệu',
    slug: 'nguyen-lieu',
    tags: [],
    name: 'ingredient',
    component: 'ModalRecipeIngredients',
    service: {
      api: 'ingredients',
      params: {
        is_official: true,
        _limit: 50,
        page: 1
      }
    }
  },
  {
    id: 2,
    featured_media: {
      url: '/images/loai-bua-an.jpg'
    },
    title: 'Loại bữa ăn',
    subTitle: "Bữa sáng, bữa tối, ăn nhậu...",
    slug: 'loai-bua-an',
    tags: [],
    name: 'meal',
    component: 'ModalRecipeCookType',
    service: {
      api: 'recipe-categories/random',
      params: {
        _limit: 20
      }
    }
  },
  {
    id: 3,
    featured_media: {
      url: '/images/cach-nau.jpg'
    },
    title: 'Cách nấu',
    subTitle: "Hấp, chiên, luộc xào, nướng...",
    slug: 'cach-nau',
    name: 'processing',
    tags: [],
    component: 'ModalRecipeCookProcess',
    service: {
      api: 'processings/random',
      params: {
        _limit: 20
      }
    }
  },
  {
    id: 4,
    featured_media: {
      url: '/images/vung-mien.jpg'
    },
    title: 'Vùng miền',
    subTitle: "Bắc, Trung, Hàn, Nhật...",
    slug: 'vung-mien',
    name: 'regional',
    tabs: [{ 'name': 'Trong nước', 'slug': 'trong-nuoc' }, { 'name': 'Ngoài nước', 'slug': 'ngoai-nuoc' }],
    component: 'ModalRecipeRegions',
    service: {
      api: 'regionals',
      params: {
        _limit: 20
      }
    }
  },
]