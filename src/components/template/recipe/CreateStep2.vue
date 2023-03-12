<template>
  <div id="material" class="tab-pane fade">
    <Form as="div" class="row">
      <div v-for="(item, index) in data" :key="index" class="col-6">
        <div class="wrap-items" :class="{ 'active-wrap-items': index === activeItem }" @click="setActive(index)">
          <Field
            :name="`ingredient-${ index }`"
            rules="required"
          >
            <div class=" d-flex justify-content-between align-items-center position-relative">
              <img width="10" height="16" src="/images/grid.png" />
              <div
                class="gray-avt" :style="{
                background: data[index].materialImage
                  ? 'url(' + data[index].materialImage + ')'
                  : '#b0b0b0',
              }"></div>

              <input
                v-model="data[index].title"
                :name="'Nguyên liệu ' + (index + 1)"
                :placeholder="'Nguyên liệu ' + (index + 1) + ' *'"
                class="select-input-wrap ms-2 me-2"
                @keyup="changeTitleMaterial($event.target.value)"
              />

              <!-- modal chose material -->
              <!-- <TemplatesRecipeCreateMaterialItem v-if="activeItem === index" :active="activeMaterial" :pos="index"
                :search="textSearchMaterial" @change-title-material="changeTitleMaterialPopup">
              </TemplatesRecipeCreateMaterialItem> -->


              <img src="/images/trash-bin-red.png" @click="removeField(index, item)" />
            </div>
          </Field>
          <ErrorMessage :name="`ingredient-${ index }`" class="error-red" />

          <div class="
              d-flex
              justify-content-end
              wrap-cound-items
              position-relative
            ">
            <Field :name="`quantity-${index}`" v-slot="{ errors }" rules="required">
              <div class="right-in">
                <input v-model="data[index].number" :name="`quantity-${index}`" width="130" type="number"
                  class="wrap-item fix-wrap-item w-130" placeholder="Số lượng*" min="0" />
              </div>
            </Field>
            <ErrorMessage :name="`quantity-${index}`" class="error-red" />

            <Field :name="`unit-${index}`" v-slot="{ errors }" rules="required">
              <div class="right-in">
                <input v-model="data[index].unit" name="Đơn vị" width="130" class="wrap-item fix-wrap-item w-130"
                  placeholder="Đơn vị*" @keyup="changeMaterialUnit($event.target.value, index)"
                />
                <!-- modal chose unit -->
                <!-- <TemplatesRecipeCreateMaterialUnit v-if="activeItemUnit === index" :active="activeUnit" :pos="index"
                  :units="units" :search="textSearchUnit" @change-title-unit="changeTitleUnitPopup"
                  @close-modal-material="closeModalMaterial"></TemplatesRecipeCreateMaterialUnit> -->
              </div>
            </Field>
            <ErrorMessage :name="`unit-${index}`" class="error-red" />
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <input :id="'one' + index" v-model="data[index].type" type="radio" name="type" class="hidden-input"
              value="main" />
            <label class="select-button select-button--sm  fix-btn-tabs" :class="{
              active: data[index].type === 'main',
            }" :for="'one' + index">Nguyên liệu chính</label>
            <input :id="'two' + index" v-model="data[index].type" type="radio" name="type" class="hidden-input"
              value="side" />
            <label class="select-button select-button--sm fix-btn-tabs" :class="{
              active: data[index].type === 'side' || !data[index].type,
            }" :for="'two' + index">Nguyên liệu phụ</label>
            <input :id="'three' + index" v-model="data[index].type" type="radio" name="type" class="hidden-input"
              value="spice" />
            <label class="select-button select-button--sm fix-btn-tabs" :class="{ active: data[index].type === 'spice' }"
              :for="'three' + index">Gia vị</label>
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
// import { mapGetters } from 'vuex';
import { Field, Form, ErrorMessage } from 'vee-validate'
export default {
  data() {
    return {
      data: [{
        id: '',
        title: '',
        number: '',
        unit: '',
        unitId: '',
        type: 'main',
        materialImage: '',
      }],
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
  // async fetch() {
  //   this.units = await this.$strapi.$http.$get('units')
  // },
  // computed: {
  //   ...mapGetters({
  //     ingredients: 'modules/cook/ingredients',
  //   }),
  // },
  // mounted() {
  //   if (this.ingredients?.length > 0) {
  //     const ingredients = this.ingredients
  //     ingredients.forEach((element, index) => {
  //       if (index > 0) this.addField()
  //       this.data[index].title = element.ingredient.title  // nguyên liệu
  //       this.data[index].number = element.quantity   // số lượng
  //       this.data[index].unit = element.unit.title  // Đơn vị
  //       this.data[index].unitId = element.unit.id
  //       this.data[index].type = element.type  // loại nguyên liệu
  //       this.data[index].id = element.ingredient.id
  //       this.data[index].materialImage = this.$$strapi.getMediaLink(element.ingredient.featured_media, 'small')
  //     });
  //   }
  // },
  methods: {
    changeTitleMaterial(e) {
      if (e == null || e === '') {
        this.activeMaterial = false
      }
      this.activeMaterial = true
      this.textSearchMaterial = e
    },
    changeMaterialUnit(e, index) {
      this.activeItemUnit = index
      this.activeUnit = true
      this.textSearchUnit = e
    },
    changeTitleMaterialPopup(title, indexMaterial, imageMaterial, id) {
      this.data[indexMaterial].title = title
      this.data[indexMaterial].id = id
      this.data[indexMaterial].materialImage = imageMaterial
      this.activeMaterial = false
    },
    changeTitleUnitPopup(title, indexUnit, id) {
      this.data[indexUnit].unit = title
      this.data[indexUnit].unitId = id
      this.activeUnit = false
    },
    closeModalMaterial() {
      this.activeUnit = false
    },
    openModel(modalName) {
      this.$emit('open-modal', modalName)
    },
    addField() {
      this.data.push({
        id: '',
        title: '',
        number: '',
        unit: '',
        unitId: '',
        type: 'main',
        materialImage: '',
      })
    },
    removeField(index, item) {
      if (this.data?.length === 1) {
        return this.$toast.error('Món ăn cần ít nhất 1 nguyên liệu');
      }
      this.data.splice(index, 1)
    },
    setActive(index) {
      this.activeItem = index
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
  .img-wrap {
    width: 60px;
    height: 59px;
    background: #f1f1f1;
    border: 1px dashed #b0b0b0;
    border-radius: 10px;
    margin-top: 24px;
    cursor: pointer;
    position: relative;

    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
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
</style>