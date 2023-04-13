import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'

export default defineNuxtPlugin(() => {

  return {
    provide: {
      cloneDeep: _cloneDeep,
      get: _get
    }
  }
})