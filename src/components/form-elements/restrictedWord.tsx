const restrictedWordFormElement = [
  {
    type: "input",
    name: "word",
    label: "Từ khoá hạn chế",
    rules: [
      {
        required: true,
        message: "Vui lòng nhập từ khoá hạn chế"
      }
    ],
    inputProps: {
      placeholder: "Nhập từ khoá hạn chế"
    }
  },
  {
    type: "input",
    name: "replacement",
    label: "Từ thay thế",
    inputProps: {
      placeholder: "Nhập từ thay thế"
    }
  },
  {
    type: "restrictedWordTypeSelect",
    name: "type",
    label: "Loại từ khóa",
    rules: [
      {
        required: true,
        message: "Vui lòng chọn loại từ khóa"
      }
    ],
    inputProps: {
      placeholder: "Chọn loại từ khóa"
    }
  }
];

const restrictedWordFormElementEdit = [
  {
    name: "id",
    hidden: true
  },
  {
    type: "input",
    name: "word",
    label: "Từ khoá hạn chế",
    rules: [
      {
        required: true,
        message: "Vui lòng nhập từ khoá hạn chế"
      }
    ],
    inputProps: {
      placeholder: "Nhập từ khoá hạn chế",
      disabled: true
    }
  },
  {
    type: "input",
    name: "replacement",
    label: "Từ thay thế",
    inputProps: {
      disabled: true
    }
  },
  {
    type: "restrictedWordTypeSelect",
    name: "type",
    label: "Loại từ khóa",
    rules: [
      {
        required: true,
        message: "Vui lòng chọn loại từ khóa"
      }
    ],
    inputProps: {
      placeholder: "Chọn loại từ khóa"
    }
  }
];

export { restrictedWordFormElement, restrictedWordFormElementEdit };
