import { defineStore } from 'pinia'

export default defineStore({
  id: 'cook-store',
  state: () => ({
    mainCook: {},
    recipeMeal: {},
    cooking_time: {
      time: 0,
      humanReadable: '',
      minutes: 0,
      hours: 0
    },
    processing: {
      name: '',
      id: 0
    },
    regional: {
      name: '',
      id: 0
    },
    data: {
      title: "",
      slug: "",
      content: "",
      regional: 0,
      processing: 0,
      serving: 0,
      cooking_time: 0,
      level: "",
      ingredients: [],
      steps: [],
      featured_media: '',
      recipe_categories: [],
      tags: []
    },
  }),

  getters: {
    changeCook: (state) => state.mainCook,
    changeMeal: (state) => state.recipeMeal,
    recipeData: (state) => state.data,
  },

  actions: {
    changeMainCook(data) {
      this.mainCook = {...data}
    },
    changeRecipeMeal(data) {
      this.recipeMeal = {...data}
    },
    setRecipeData(data) {
      this.data = {...data}
    },
    changeRecipeData({ entity, value }) {
      this.data[entity] = value
    },
    setProcessing({ id = 0, title = '' }) {
      this.processing = { id, name: title }
    },
    setRegional({ id = 0, title = '' }) {
      this.regional = { id, name: title }
    },
    setCookingTime({ isHumanReadable = true, hours, minutes }) {
      const readableHours = isHumanReadable ? hours : Math.floor(+minutes / 60)
      const readableMinutes = isHumanReadable ? +minutes : +minutes % 60
      const humanReadable = +readableHours === 0 ? `${readableMinutes} phút` : `${readableHours} giờ ${readableMinutes} phút`
      // console.log({ isHumanReadable , hours, minutes, readableHours })
      const time = readableHours * 60 + minutes

      this.cooking_time.time = time
      this.cooking_time.humanReadable = humanReadable
      this.cooking_time.hours = hours
      this.cooking_time.minutes = minutes

    },
    clearCook() {
      this.cooking_time = {time: 60, humanReadable: '1 giờ'}
      this.processing = {name: '', id: 0}
      this.regional = {name: '', id: 0}
      this.ingredients = []
      this.data = {
        title: "",
        slug: "",
        content: "",
        regional: 0,
        processing: 0,
        serving: 0,
        cooking_time: 0,
        level: "",
        ingredients: [],
        steps: [],
        featured_media: '',
        recipe_categories: [],
        tags: [],
        id: 0
      }
    }
  }
})