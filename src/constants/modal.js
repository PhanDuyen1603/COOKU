
export const listModal = {
  LOGIN: 'modalLogin',
  REGISTER: 'modalRegister',
  FORGOT_PASSWORD: 'modalForgotPassword',
  RESET_PASSWORD: 'modalResetPassword',
  COLLECTION: 'modalCollection',
  DEVELOPING: 'modalDeveloping'
}

export const modalComponents = {
  DEVELOP: 'ModalDevelop',
}

export const modalActionPayload = {
  NAME: 'name',
  OPEN: 'open',
  TYPE: 'type',
  DATA: 'data'
}

export const ruleLoginRequire = {
  [listModal.LOGIN]: {
    require: false,
    message: ''
  },
  [listModal.REGISTER]: {
    require: false,
    message: ''
  },
  [listModal.FORGOT_PASSWORD]: {
    require: false,
    message: ''
  },
  [listModal.RESET_PASSWORD]: {
    require: false,
    message: ''
  },
  [listModal.COLLECTION]: {
    require: true,
    message: 'Bạn cần đăng nhập để thêm bộ sưu tập'
  },
  [listModal.DEVELOPING]: {
    require: false,
    message: ''
  }
}

export const modalStyles = {
  [modalComponents.DEVELOP]: {
    'width': '452px',
    'padding': '30px',
    'overflow': 'hidden',
    'margin-top': 'auto',
    'margin-bottom': 'auto',
  }
}