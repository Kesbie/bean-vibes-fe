const categoryFormElement = [
  {
    type: "input",
    name: "name",
    label: "Tên danh mục",
    rules: [
      {
        required: true,
        message: "Vui lòng nhập tên danh mục"
      }
    ],
    inputProps: {
      placeholder: "Nhập tên danh mục"
    }
  },
  {
    type: "input",
    name: "slug",
    label: "Slug",
    inputProps: {
      placeholder: "Nhập slug"
    }
  },
  {
    type: "mediaUpload",
    inputProps: {
      name: "thumbnail",
      label: "Ảnh đại diện"
    }
  },
  {
    type: "textarea",
    name: "description",
    label: "Mô tả",
    cols: 2,
    inputProps: {
      placeholder: "Nhập mô tả",
      rows: 4
    }
  },
  {
    type: "categoryTypeSelect",
    name: "type",
    label: "Loại danh mục",
    rules: [
      {
        required: true,
        message: "Vui lòng chọn loại danh mục"
      }
    ],
    inputProps: {
      placeholder: "Chọn loại danh mục"
    }
  }
];

const categoryFormElementEdit = [
  {
    name: "id",
    hidden: true
  },
  ...categoryFormElement
];

export { categoryFormElement, categoryFormElementEdit };
