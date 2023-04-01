<template>
  <div id="material" class="tab-pane fade" ref="el">
    <Form
      as="div"
      class="row"
      ref="createStep2"
      :validation-schema="validationSchema"
      v-slot="observe"
    >
      <div v-for="(item, index) in formData" :key="index" class="col-6">
        <div
          class="wrap-items"
          :class="{ 'active-wrap-items': index === activeItem }" @click="setActive(index)"
        >
          <div class="validation-input__wrapper">
            <Field
              :name="`ingredient-${ index }`"
              v-slot="{ field }"
            >
              <div class=" d-flex justify-content-between align-items-center position-relative">
                <img width="10" height="16" src="/images/grid.png" />
                <div
                  class="gray-avt" :style="{
                  background: item.materialImage
                    ? 'url(' + item.materialImage + ')'
                    : '#b0b0b0',
                }"></div>

                <input
                  v-model="item.title"
                  v-bind="field"
                  autocomplete="off"
                  :name="`ingredient-${ index }`"
                  :placeholder="'Nguyên liệu ' + (index + 1) + ' *'"
                  class="select-input-wrap ms-2 me-2"
                  @click="changeIngredient(observe, index)"
                />

                <img src="/images/trash-bin-red.png" @click="removeField(index, item)" />
              </div>
            </Field>
            <ErrorMessage :name="`ingredient-${ index }`" class="error-red" />
          </div>

          <div class="
              d-flex
              justify-content-end
              wrap-cound-items
              position-relative
            ">
            <div class="validation-input__wrapper">
              <Field
                :name="`quantity-${index}`"
                v-slot="{ field }"
              >
                <div class="right-in">
                  <input
                    v-model="item.number"
                    v-bind="field"
                    :name="`quantity-${index}`"
                    width="130" type="number"
                    class="wrap-item fix-wrap-item w-130"
                    placeholder="Số lượng*" min="0"
                  />
                </div>
              </Field>
              <ErrorMessage :name="`quantity-${index}`" class="error-red" />
            </div>

            <div class="validation-input__wrapper">
              <Field :name="`unit-${index}`" v-slot="{ field }" rules="required">
                <div class="right-in">
                  <input
                    v-model="item.unit"
                    v-bind="field"
                    name="Đơn vị" width="130"
                    class="wrap-item fix-wrap-item w-130"
                    placeholder="Đơn vị*"
                    @keyup="changeMaterialUnit($event.target.value, index)"
                  />

                </div>
              </Field>
              <ErrorMessage :name="`unit-${index}`" class="error-red" />
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <input
              :id="'one' + index"
              v-model="item.type"
              type="radio" name="type"
              class="hidden-input"
              value="main"
            />
            <label
              class="select-button select-button--sm  fix-btn-tabs"
              :class="{ active: item.type === 'main' }"
              :for="'one' + index"
            >
              Nguyên liệu chính
            </label>
            <input
              :id="'two' + index"
              v-model="item.type"
              type="radio"
              name="type"
              class="hidden-input"
              value="side"
            />
            <label
              class="select-button select-button--sm fix-btn-tabs"
              :class="{ active: item.type === 'side' || !item.type }"
              :for="'two' + index"
            >Nguyên liệu phụ</label>
            <input
              :id="'three' + index"
              v-model="item.type"
              type="radio"
              name="type"
              class="hidden-input"
              value="spice"
            />
            <label
              class="select-button select-button--sm fix-btn-tabs"
              :class="{ active: item.type === 'spice' }"
              :for="'three' + index"
            >Gia vị</label>
          </div>
        </div>
      </div>
    </Form>
    <div class="col-12 d-flex justify-content-end">
      <div class="button-add" @click="addField">
        <div class="icon__circle">
          <img class="fix-ic" with="15" height="15" src="/images/plus-big.png" />
        </div>
        Thêm
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate'
import { categories } from '~/constants/recipe'
import useCookStore from '~/stores/cook.store'

const ingredientCategory = categories.find(x => x.slug === 'nguyen-lieu')

export default {
  data() {
    return {
      activeItem: 0,
      activeItemUnit: 0,
      activeMaterial: false,
      activeUnit: false,
      textSearchMaterial: null,
      textSearchUnit: null,
      units: [],
    }
  },
  components: {
    Field, Form, ErrorMessage
  },

  async setup(props) {
    const { find } = useStrapi()
    const { $modal , $cloneDeep, $$strapi } = useNuxtApp()
    const $store = useCookStore()

    const createStep2 = ref(null)
    const formData = reactive([{
      id: '',
      title: '',
      number: '',
      unit: '',
      unitId: '',
      type: 'main',
      materialImage: '',
    }])

    // vee valiation
    const validationSchema = reactive({
      [`ingredient-0`]: 'required',
      [`quantity-0`]: 'required',
      [`unit-0`]: 'required',
    })

    watch('formData.length', ( newValue, oldValue ) => {
      if(newValue > oldValue) {
        validationSchema = {
          validationSchema,
          [`ingredient-${newValue - 1}`]: 'required',
          [`quantity-${newValue - 1}`]: 'required',
          [`unit-${newValue - 1}`]: 'required',
        }
      } else {
        const cloneOb = $cloneDeep(validationSchema)
        delete cloneOb[`ingredient-${oldValue - 1}`]
        delete cloneOb[`quantity-${oldValue - 1}`]
        delete cloneOb[`unit-${oldValue - 1}`]
        validationSchema = cloneOb
      }
    })
    //

    const ingredient = ref('')

    const changeIngredient = async (observe, index) => {
      let res = await find(ingredientCategory.service.api)
      if(typeof res === 'object' && !!res.data) res = res.data
      const data = await $modal.show({
        component: 'ModalRecipeIngredients',
        props: {
          style: {
            width: '900px'
          },
          dataList: res,
          tags: ingredientCategory.tags
        }
      })
      formData[index].title = data.title || ''
      formData[index].ingredient = data.id
      // TODO: unit
      formData[index].unit = null

      observe.setFieldValue(`ingredient-${index}`, data.title)
      observe.validateField(`ingredient-${index}`)
    }

    const addField = () => {
      formData.push({
        id: '',
        title: '',
        number: '',
        unit: '',
        unitId: '',
        type: 'main',
        materialImage: '',
      })
    }

    const addSchema = (index) => {
      validationSchema[`ingredient-${index}`] = 'required'
      validationSchema[`quantity-${index}`] = 'required'
      validationSchema[`unit-${index}`] = 'required'
    }

    const clear = () => {
      formData = [{
        id: '',
        title: '',
        number: '',
        unit: '',
        unitId: '',
        type: 'main',
        materialImage: '',
      }]
      validationSchema = {
        [`ingredient-0`]: 'required',
        [`quantity-0`]: 'required',
        [`unit-0`]: 'required',
      }
    }

    onMounted(async () => {
      const recipe = $store.data
      if (recipe.id) {
        const ingredients = recipe.ingredients
        ingredients.forEach((element, index) => {
          if (index > 0) {
            addField()
            addSchema(index)
          }
          formData[index].title = element.ingredient.title  // nguyên liệu
          formData[index].number = element.quantity   // số lượng
          formData[index].unit = element.unit?.title  // Đơn vị
          formData[index].unitId = element.unit?.id
          formData[index].type = element.type  // loại nguyên liệu
          formData[index].id = element.ingredient.id
          formData[index].materialImage = $$strapi.getMediaLink(element.ingredient.featured_media, 'small')

          createStep2.value.setFieldValue(`ingredient-${index}`, element.ingredient.title)
          createStep2.value.setFieldValue(`quantity-${index}`, element.quantity + '')
          createStep2.value.setFieldValue(`unit-${index}`, element.unit?.title)
        });
      }
      // const res = await createStep2.value.validate()
    })

    return {
      changeIngredient,
      addField,
      clear,

      createStep2,
      ingredient,
      formData,
      validationSchema
    }
  },
  methods: {
    changeMaterialUnit(e, index) {
      this.activeItemUnit = index
      this.activeUnit = true
      this.textSearchUnit = e
    },
    changeTitleMaterialPopup(title, indexMaterial, imageMaterial, id) {
      this.formData[indexMaterial].title = title
      this.formData[indexMaterial].id = id
      this.formData[indexMaterial].materialImage = imageMaterial
      this.activeMaterial = false
    },
    changeTitleUnitPopup(title, indexUnit, id) {
      this.formData[indexUnit].unit = title
      this.formData[indexUnit].unitId = id
      this.activeUnit = false
    },
    closeModalMaterial() {
      this.activeUnit = false
    },
    openModel(modalName) {
      this.$emit('open-modal', modalName)
    },
    removeField(index, item) {
      if (this.formData?.length === 1) {
        return this.$toast.show({
          message: 'Món ăn cần ít nhất 1 nguyên liệu',
          type: 'warning'
        });
      }
      this.formData.splice(index, 1)
    },
    setActive(index) {
      this.activeItem = index
    },
    async validate() {
      const result = await this.$refs.createStep2.validate()
      if (!result.valid) {
        this.$toast.show({
          message: 'Vui lòng kiểm tra thông tin bước 2',
          type: 'warning'
        })
        this.$emit('swtich-step', 1)
        return false
      }
      return true
    }
  },
}
</script>

<style lang="scss">

.wrap-items-fix,
.wrap-items {
  background: #ffffff;
  border: 2px dashed #fbe4c8;
  box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 5%) !important;

  .title-step {
    font-weight: bold;
    font-size: 30px;
    line-height: 2.5rem;
    color: #4f4f4f;
    margin-right: 10px;
  }

  .input-step {
    background: #fbfbfb;
    border-radius: 30px;
    outline: none;
    border: none;
    padding: 5px 10px;
    margin: 0px 5px;
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #4f4f4f;
  }
}

.wrap-items {
  box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 5%);
  border-radius: 16px;
  background: #ffffff;
  border: 2px solid #f1f1f1;
  padding: 20px;
  margin-bottom: 25px;
}

.wrap-items {
  img:first-child {
    margin-right: 10px;
  }

  img:nth-child(2) {
    margin-right: 5px;
  }

  img:last-child {
    margin-left: 5px;
  }

  .select-input-wrap {
    width: 100%;
    background: #fbfbfb;
    border-radius: 30px;
    border: none !important;
    padding: 5px 10px;
    font-size: 20px;
    line-height: 27px;
  }
}
.wrap-cound-items .wrap-item {
  border: 1px solid #fbe4c8;
  border-radius: 16px;
  padding: 5px 10px;
  color: #4f4f4f;
  font-size: var(--fs-sm);
  line-height: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 5px;
  max-width: 130px;
}

.active-wrap-items {
  border: 2px solid #fbe4c8 !important;
}
.button-add {
  padding: 5px 10px;
  background: #df8c26;
  border-radius: 40px;
  margin: 10px 0;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
  .icon__circle {
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 5px;
  }
}
.validation-input__wrapper {
  position: relative;
  .error-red {
    position: absolute;
    bottom: -5px;
    margin: 0;
    font-size: var(--fs-xs);
  }
}
</style>