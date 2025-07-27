const placeElement = [
  {
    type: 'input',
    name: 'name',
    label: 'Tên quán',
    inputProps: {
      placeholder: 'Nhập tên quán',
      required: true,
    },
  },
  {
    type: 'address',
    name: 'address',
    label: 'Địa chỉ',
    inputProps: {
      placeholder: 'Nhập địa chỉ',
      required: true,
    },
  },
  {
    type: 'textArea',
    name: 'description',
    label: 'Giới thiệu',

  },
  {
    type: 'timeOpening',
    name: 'time',
    label: 'Giờ mở cửa',
    inputProps: {

    },
  },
  {
    type: 'price',
    name: 'price',
    label: 'Giá',
    inputProps: {
    },
  },
  {
    type: 'wifi',
    name: 'wifi',
    label: 'Wifi',
    inputProps: {
    },
  },
  {
    type: 'categorySelect',
    name: 'categories',
    inputProps: {
    },
  },
  {
    type: 'socialList',
    name: 'socials',
    label: 'Mạng xã hội',
    inputProps: {
    },
  },
  {
    type: 'images',
    name: 'photos',
  },
]

export { placeElement };