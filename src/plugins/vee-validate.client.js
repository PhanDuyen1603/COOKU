import { defineRule } from 'vee-validate';

const REGEX_NUM = '0-9'
const REGEX_EN = 'a-zA-Z'
const REGEX_KO = 'ㄱ-ㅎ가-힣'
const REGEX_ADDRESS = '\\-\\(\\)'

function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

export default defineNuxtPlugin(() => {
  const { $config } = useNuxtApp()

  const config = { ...$config, ...$config.public }

  defineRule('required', (value, _, { field: fieldName }) => {
    const valid = value && value.length

    return valid || 'Vui lòng nhập'
  });

  defineRule('numeric', value => {
    const isValid = (() => {
      if (!value) {
        return true
      }

      var ar = /^[٠١٢٣٤٥٦٧٨٩]+$/;
      var en = /^[0-9]+$/;

      var testValue = function (val) {
        var strValue = String(val);
        return en.test(strValue) || ar.test(strValue);
      };
      if (Array.isArray(value)) {
        return value.every(testValue);
      }
      return testValue(value);
    })()

    return isValid || $t('validate.message.numeric');
  })

  defineRule('max', (value, [limit]) => {
    const isValid = (function validate$a() {
      if (!value) {
        return true
      }
      var length = limit;
      if (isNullOrUndefined(value)) {
        return length >= 0;
      }
      if (Array.isArray(value)) {
        return value.every(function (val) { return validate$a(val, { length: length }); });
      }
      return String(value).length <= length;
    })()

    return isValid || `Không đuược nhập quá ${limit} ký tự`;
  });

  defineRule('min', (value, [limit]) => {
    const isValid = (function validate$7() {
      if (!value) {
        return true
      }
      var length = limit;
      if (isNullOrUndefined(value)) {
        return false;
      }
      if (Array.isArray(value)) {
        return value.every(function (val) { return validate$7(val, { length: length }); });
      }
      return String(value).length >= length;
    })()


    return isValid || `Nhập tối thiểu ${limit} ký tự`;
  });

  defineRule('email', value => {
    const isValid = (() => {
      if (!value || !value.length) {
        return false
      }

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return re.test(value)
    })()

    return isValid || $t('validate.message.email');;
  });

  // defineRule('telephone', (telephone, _, { field: fieldName }) => {
  //   const isValid = (() => {
  //     if (!telephone) {
  //       return true
  //     }
  //     const prefix = config.validation.telephone_prefixes
  //     return new RegExp(`^((${prefix})[0-9]{3,4}[0-9]{4})$`).test(telephone)
  //   })()
  //   return isValid || $t('validate.message.phoneNumber', { field: fieldName })
  // })

  defineRule('birthday', (value) => {
    const isValid = (() => {
      if (!value) {
        return true
      }
      const birthdayRegex = /^(19[0-9][0-9]|20[0-2][0-2])(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
      return birthdayRegex.test(value)
    })()

    return isValid || $t('validate.message.birthday')
  })
})
