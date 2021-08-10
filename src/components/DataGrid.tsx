/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useState, useEffect } from "react";
import { IProps, IElement, IColumn, ISort } from "./DataGrid.type";
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { Table } from "./StyledComponents";

export function DataGrid<T = any>(props: IProps<T>) {
  const [sort, setSort] = useState<ISort<T>>();

  useEffect(() => {
    if (sort && props.handleSort) props.handleSort(sort);
  }, [sort]);

  /** declare columnBySort */
  const renderColBySort = (key: keyof T, children: ReactNode) => {
    const showSort =
      props.sortable && sort?.key === key && sort.desc !== undefined ? "show-sort" : "";

    const icon = sort?.desc ? HiOutlineArrowNarrowDown : HiOutlineArrowNarrowUp;
    const renderSortIcon = React.createElement(icon, { className: "sort-icon" });

    const handleSort = () => (props.sortable ? setSort({ key, desc: !sort?.desc }) : null);

    return (
      <div className={`show-sort`} key={uuidv4()} onClick={handleSort}>
        {children}
        {showSort ? renderSortIcon : null}
      </div>
    );
  };

  /** calculate datagrid inner render */
  const renderChildren = (
    renderData?: boolean,
    data?: T,
    column?: IColumn<T> | keyof T
  ): ReactNode => {
    const col_obj = column as IColumn<T> | undefined;
    const col_key = column as keyof T | undefined;
    const key: keyof T | undefined = col_obj?.dataField || col_key;

    if (renderData && data && key) {
      return col_obj?.customRender ? col_obj.customRender(data) : data[key];
    } else {
      const children = col_obj?.caption || col_obj?.dataField || col_key;

      return props.showBorder && key ? renderColBySort(key, children) : children;
    }
  };

  /** render single column of data-grid */
  const renderColumn = (
    element: IElement,
    column: IColumn<T> | keyof T,
    index: number,
    renderData?: boolean
  ) => {
    const data = props.dataSource && props.dataSource[index];
    let children = renderChildren(renderData, data, column);
    return React.createElement(element, { key: uuidv4() }, children);
  };

  /** render single row of data-grid */
  const renderRow = (index: number) => <tr key={uuidv4()}>{columns("td", true, index)}</tr>;

  /** render all row in data-grid */
  const rows = () => props.dataSource?.map((_, index) => renderRow(index));

  /** render all columns in data-grid */
  const columns = (element: IElement, renderData: boolean, index: number = 0) =>
    props.columns
      ? props.columns.map((column, i) =>
          renderColumn(element, column, index !== undefined ? index : i, renderData)
        )
      : props.dataSource &&
        Object.keys(props.dataSource[index]).map((key, i) => {
          return renderColumn(element, key as keyof T, index !== undefined ? index : i, renderData);
        });

  return (
    <Table {...props}>
      <thead>
        <tr>{columns("th", false)}</tr>
      </thead>
      <tbody>{rows()}</tbody>
      <tfoot></tfoot>
    </Table>
  );
}

export default DataGrid;
