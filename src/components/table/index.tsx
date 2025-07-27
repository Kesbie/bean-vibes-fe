import { Table as AntdTable, type TableProps as TableAntdProps } from "antd";
import { actionColumn } from "./base-column-defs";
import React, { Key } from "react";
import { RowSelectMethod } from "antd/es/table/interface";
// import { useQuery, UseQueryOptions } from "@tanstack/react-query";
// import { useCustomPaginatedQuery, UseCustomPaginatedQueryConfigs } from "@/hooks/useQuery";

const TABLE_HEADER_HEIGHT = 55;
const TABLE_PAGINATION_HEIGHT = 140;

export type TableProps<T> = TableAntdProps<T> & {
  renderAction?: (record: T) => React.ReactNode;
  onSelectChange?: (
    selectedRowKeys: Key[],
    selectedRows: T[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  // apiOptions?: UseCustomPaginatedQueryConfigs<T>;
};

const Table = <T,>(props: TableProps<T>) => {
  const {
    pagination,
    dataSource,
    columns,
    renderAction,
    onSelectChange,
    scroll,
    // apiOptions,
    ...restProps
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  // const [currentPage, setCurrentPage] = React.useState(1);

  // const { data } = useCustomPaginatedQuery({...apiOptions, enabled: !dataSource});

  const [tableHeight, setTableHeight] = React.useState(600);
  // ref is the Table ref.
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const node = ref.current;
    const { top } = node.getBoundingClientRect();

    // normally TABLE_HEADER_HEIGHT would be 55.
    setTableHeight(
      window.innerHeight -
        top -
        (pagination ? TABLE_PAGINATION_HEIGHT : TABLE_HEADER_HEIGHT)
    );

    function handleResize() {
      setTableHeight(
        window.innerHeight -
          top -
          (pagination ? TABLE_PAGINATION_HEIGHT : TABLE_HEADER_HEIGHT)
      );
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, pagination]);

  const handleSelectChange = React.useCallback(
    (
      selectedRowKeys: Key[],
      selectedRows: T[],
      info: {
        type: RowSelectMethod;
      }
    ) => {
      setSelectedRowKeys(selectedRowKeys);
      onSelectChange?.(selectedRowKeys, selectedRows, info);
    },
    [onSelectChange]
  );

  return (
    <div className="flex-1 overflow-hidden" ref={ref}>
      <AntdTable<T>
        // dataSource={dataSource ? dataSource : data?.results}
        dataSource={dataSource}
        rowSelection={{ selectedRowKeys, onChange: handleSelectChange }}
        columns={[
          ...columns,
          ...(renderAction ? [actionColumn(renderAction)] : [])
        ]}
        scroll={{ ...{ x: 400, y: tableHeight }, ...scroll }}
        pagination={{
          // ...{
          //   pageSize: 10,
          //   current: currentPage,
          //   total: data?.totalResults,
          //   onChange: (page, pageSize) => {
          //     setCurrentPage(page);
          //   }
          // },
          ...pagination
        }}
        {...restProps}
      />
    </div>
  );
};

Table.displayName = "Table";

export default React.memo(Table) as <T>(
  props: TableProps<T>
) => ReturnType<typeof Table>;
