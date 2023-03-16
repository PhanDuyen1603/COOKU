export function removeAccent(str) {
  str = str.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
  str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
  str = str.replace(/í|ì|ỉ|ĩ|ị/gi, 'i')
  str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
  str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
  str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
  str = str.replace(/đ/gi, 'd')
  return str
}

export function readableTime({ hours, minutes }) {
  const readableHours = hours > 0 ? hours : Math.floor(+minutes / 60)
  const readableMinutes =  hours > 0 ? +minutes : +minutes % 60
  return `${readableHours} giờ ${readableMinutes} phút`
}