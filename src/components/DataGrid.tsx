/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useState, useEffect, useRef } from "react";
import { IDataGrid, IElement, IColumn, ISort, IFilter } from "./DataGrid.type";
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { StyledTable } from "./StyledComponents";
import { ColumnSearch } from "./ColumnSearch";
import { checkHasValue, getKey, scrollbarVisible } from "../utils/utils";
import { renderMessage } from "../localization/render";

const defaultProps: IDataGrid = { colorSchema: { primary: "#03C7C3" } };

export function DataGrid<T = any>(props: IDataGrid<T> = defaultProps) {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const [visibleScrollbar, setVisibleScrollbar] = useState(false);
  const [sort, setSort] = useState<ISort<T>>();
  const [filters, setFilters] = useState<IFilter<T>[]>([]);
  const [selectedRow, setSelectedRow] = useState<T>();
  // const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const message = renderMessage(props.localization);

  useEffect(() => {
    if (sort && props.handleSort) props.handleSort(sort);
  }, [sort]);

  useEffect(() => {
    if (filters && props.handleRowFilter) {
      props.handleRowFilter(filters.filter((x) => checkHasValue(x.value)));
      setTimeout(() => {
        if (tbodyRef.current) {
          setVisibleScrollbar(scrollbarVisible(tbodyRef.current));
        }
      }, 50);
    }
  }, [filters]);

  useEffect(() => {
    tbodyRef.current?.addEventListener("scroll", scroll);
    return () => tbodyRef.current?.removeEventListener("scroll", scroll);
  }, [tbodyRef.current?.scrollTop]);

  useEffect(() => {
    selectedRow && props.onSelectionChanged && props.onSelectionChanged({ selectedRow });
  }, [selectedRow]);

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
    index: number,
    renderData?: boolean,
    data?: T,
    column?: IColumn<T> | keyof T,
    element?: IElement
  ): ReactNode => {
    const col_obj = column as IColumn<T> | undefined;
    const col_key = column as keyof T | undefined;
    const key: keyof T | undefined = col_obj?.dataField || col_key;

    if (renderData && data && key) {
      if (col_obj?.dataType === "boolean") {
        const checkBox = <input type="checkbox" readOnly checked={Boolean(data[key])} />;
        if (element !== "th")
          return (
            <div className="border">
              {col_obj?.customRender ? col_obj.customRender(data, index) : checkBox}
            </div>
          );
        else return col_obj?.customRender ? col_obj.customRender(data, index) : checkBox;
      }
      if (element !== "th")
        return (
          <div className="border">
            {col_obj?.customRender ? col_obj.customRender(data, index) : data[key]}
          </div>
        );
      else return col_obj?.customRender ? col_obj.customRender(data, index) : data[key];
    } else {
      const children = col_obj?.caption || col_obj?.dataField || col_key;
      if (element !== "th")
        return (
          <div className="border">
            {props.visibleBorder && key ? renderColBySort(key, children) : children}
          </div>
        );
      else return props.visibleBorder && key ? renderColBySort(key, children) : children;
    }
  };

  /** render single column of data-grid */
  const renderColumn = (
    element: IElement,
    column: IColumn<T> | keyof T,
    index: number,
    renderData?: boolean
  ) => {
    const col_obj = column as IColumn<T> | undefined;
    const data = props.dataSource && props.dataSource[index];
    let children = renderChildren(index, renderData, data, column, element);

    return React.createElement(
      element,
      { key: uuidv4(), style: { width: col_obj?.width } },
      children
    );
  };

  const handleSingleSelection = (index: number) => {
    props.dataSource && setSelectedRow(props.dataSource[index]);
  };

  const handleMultipleSelection = (index: number) => {};

  /** render single row of data-grid */
  const renderRow = (index: number) => {
    let onRowClick = (index: number) => {};
    let selectRowStyle = "";

    if (props.selectionMode === "single" && props.dataSource) {
      onRowClick = handleSingleSelection;
      if (props.dataSource[index] === selectedRow) selectRowStyle = "selected-border";
    } else if (props.selectionMode === "multiple") onRowClick = handleMultipleSelection;

    return (
      <tr key={uuidv4()} onClick={() => onRowClick(index)} className={selectRowStyle}>
        {columns("td", true, index)}
      </tr>
    );
  };

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

  const renderSummary = () => {
    return <></>;
  };

  const handleFilterChange = (e?: IFilter<T>) => {
    const temp = [...filters];

    if (temp?.find((x) => x.key === e?.key)) {
      const index = temp.findIndex((x) => x.key === e?.key);
      temp && e && (temp[index] = { ...e });
    } else {
      e && e.value !== null && temp.push({ ...e });
    }

    setFilters(temp);
  };

  const renderColumnsSearch = props.columns?.map((column, index) => {
    const col_obj = column as IColumn<T> | undefined;
    return typeof getKey(column) === "string" ? (
      <td key={uuidv4()} style={{ width: col_obj?.width }}>
        <ColumnSearch
          column={column}
          data={filters.find((x) => x.key === getKey(column))}
          onSubmit={handleFilterChange}
          index={index}
          message={message}
        />
      </td>
    ) : (
      <td key={uuidv4()} style={{ width: col_obj?.width }}>
        <form style={{ height: 31, borderInlineEnd: "1px solid #cdcfd4" }} />
      </td>
    );
  });

  const scroll = () => {
    const tbody = tbodyRef.current;

    if (tbody && tbody.offsetHeight + tbody.scrollTop >= tbody.scrollHeight)
      props.scrolledToBottom && props.scrolledToBottom();
  };

  return (
    <StyledTable {...props} hasScrolbar={visibleScrollbar}>
      <thead>
        <tr>{columns("th", false)}</tr>
        {props.columnSearch && <tr style={{ backgroundColor: "white" }}>{renderColumnsSearch}</tr>}
      </thead>
      <tbody ref={tbodyRef}>{rows()}</tbody>
      <tfoot>{renderSummary()}</tfoot>
    </StyledTable>
  );
}

export default DataGrid;
