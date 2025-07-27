import { ColumnType } from "antd/es/table";

const actionColumn = <T,>(customerRender: (record: T) => React.ReactNode) =>
  ({
    title: "Hành động",
    key: "action",
    width: 120,
    fixed: 'right',
    render: (_, record) => customerRender(record)
  } as ColumnType<T>);

export { actionColumn };
