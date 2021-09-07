/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useState, useEffect, useRef } from "react";
import { IDataGrid, IElement, IColumn, ISort, FilterParams } from "./DataGrid.type";
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import * as S from "./StyledComponents";
import { ColumnSearch } from "./ColumnSearch";
import { checkHasValue, getKey, keyify, scrollbarVisible } from "../utils/utils";
import { renderMessage } from "../localization/render";
import { Paths } from "../utils/types";
import { get } from "lodash";
import { SortOrders } from "..";

const defaultProps: IDataGrid = { colorSchema: { primary: "#03C7C3" } };

export function DataGrid<T = any>(props: IDataGrid<T> = defaultProps) {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const [visibleScrollbar, setVisibleScrollbar] = useState(false);
  const [sort, setSort] = useState<ISort<T>>();
  const [filters, setFilters] = useState<FilterParams<T>[]>([]);
  const [selectedRow, setSelectedRow] = useState<T>();
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const message = renderMessage(props.localization);

  useEffect(() => {
    if (sort && props.handleSort) props.handleSort(sort);
  }, [sort]);

  useEffect(() => {
    if (filters && props.handleRowFilter) {
      props.handleRowFilter(filters.filter((x) => checkHasValue(x.FilterValue)));
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
    selectedRow && props.handleSelectionChanged && props.handleSelectionChanged({ selectedRow });
  }, [selectedRow]);

  useEffect(() => {
    selectedRows && props.handleSelectionChanged && props.handleSelectionChanged({ selectedRows });
  }, [selectedRows]);

  /** declare columnBySort */
  const renderColBySort = (key: Paths<T, 2>, children: ReactNode) => {
    const showSort = sort?.ColumnName === key && sort.SortOrder !== undefined ? "show-sort" : "";

    const icon = sort?.SortOrder ? HiOutlineArrowNarrowDown : HiOutlineArrowNarrowUp;
    const renderSortIcon = React.createElement(icon, { className: "sort-icon" });

    const handleSort = () =>
      setSort({
        ColumnName: key,
        SortOrder: sort?.SortOrder === SortOrders.Asc ? SortOrders.Desc : SortOrders.Asc,
      });

    return (
      <div className={`show-sort`} key={uuidv4()} onClick={handleSort}>
        {children}
        {showSort ? renderSortIcon : null}
      </div>
    );
  };

  const renderBooleanColumn = (col_obj: IColumn<T>, data: T) => {
    const key = col_obj.dataField;
    const checkBox = <input type="checkbox" readOnly checked={key && Boolean(get(data, key))} />;

    return renderWithBorder(checkBox);
  };

  const renderTdInner = (children: ReactNode) => <div className="td-inner">{children}</div>;

  const renderWithBorder = (children: ReactNode) => <div className="border">{children}</div>;

  /** calculate datagrid inner render */
  const renderChildren = (
    index: number,
    renderData?: boolean,
    data?: T,
    column?: IColumn<T> | Paths<T, 2>,
    element?: IElement
  ): ReactNode => {
    const col_obj = column as IColumn<T> | undefined;
    const col_key = column as Paths<T, 2>;
    const key: Paths<T, 2> = col_obj?.dataField || col_key;
    let result: ReactNode | undefined;

    if (renderData && data) {
      /** */
      if (col_obj?.customRender) {
        result = renderTdInner(renderWithBorder(col_obj.customRender(data, index)));
      } else if (col_obj && col_obj?.dataType === "boolean" && element && element !== "th") {
        result = renderTdInner(renderBooleanColumn(col_obj, data));
      } else result = renderTdInner(renderWithBorder(get(data, key)));
      /** */
    } else {
      const children = col_obj?.caption || key;
      if (props.sortable && col_obj?.dataField) result = renderColBySort(key, children);
      else result = renderWithBorder(children);
    }

    return result;
  };

  const renderMultipleSelection = (inputRender = true, index: number) => {
    const find = props.dataSource?.find((ds, i) => index === i);

    const onChange = () => {
      let tmp = [...selectedRows];
      if (index === -1) {
        if (props.dataSource && selectedRows.length !== props.dataSource.length) {
          tmp = [...props.dataSource];
        } else {
          tmp = [];
        }
      } else {
        if (find && !selectedRows.includes(find)) {
          tmp = [...selectedRows, find];
        } else {
          tmp = [...selectedRows.filter((x) => x !== find)];
        }
      }
      setSelectedRows(tmp);
    };

    const checked = find && selectedRows.includes(find);

    return (
      props.selectionMode === "multiple" && (
        <S.MulipleSelectionColumn>
          {inputRender && <input type="checkbox" checked={checked} onChange={(e) => onChange()} />}
        </S.MulipleSelectionColumn>
      )
    );
  };

  /** render single column of data-grid */
  const renderColumn = (
    element: IElement,
    column: IColumn<T> | Paths<T, 2>,
    index: number,
    renderData?: boolean
  ) => {
    const col_obj = column as IColumn<T> | undefined;
    const data = props.dataSource && props.dataSource[index];
    let children = renderChildren(index, renderData, data, column, element);
    const width = col_obj?.width;

    return React.createElement(element, { key: uuidv4(), style: { width } }, children);
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

    if (props.selectionMode === "multiple" && props.dataSource) {
      if (selectedRows.includes(props.dataSource[index])) selectRowStyle = "selected-border";
    }

    const onDoubleClick = () => {
      if (props.handleRowDoubleClick && props.dataSource)
        props.handleRowDoubleClick(props.dataSource[index], index);
    };

    return (
      <tr
        key={uuidv4()}
        onClick={() => onRowClick(index)}
        onDoubleClick={onDoubleClick}
        className={selectRowStyle}
      >
        {renderMultipleSelection(true, index)}
        {columns("td", true, index)}
      </tr>
    );
  };

  /** render all row in data-grid */
  const rows = () => props.dataSource?.map((_, index) => renderRow(index));

  /** render all columns in data-grid */
  const columns = (element: IElement, renderData: boolean, index: number = 0) => {
    const renderWithColumn = props.columns?.map((column, i) =>
      renderColumn(element, column, index !== undefined ? index : i, renderData)
    );

    const renderWithoutColumn =
      props.dataSource &&
      props.dataSource.length > 0 &&
      keyify(props.dataSource[index]).map((key, i) =>
        renderColumn(element, key as Paths<T, 2>, index !== undefined ? index : i, renderData)
      );

    return props.columns ? renderWithColumn : renderWithoutColumn;
  };

  const handleFilterChange = (e?: FilterParams<T>) => {
    const temp = [...filters];

    if (temp?.find((x) => x.ColumnName === e?.ColumnName)) {
      const index = temp.findIndex((x) => x.ColumnName === e?.ColumnName);
      temp && e && (temp[index] = { ...e });
    } else {
      e && e.FilterValue !== null && temp.push({ ...e });
    }

    setFilters(temp);
  };

  function innerColumnSearch(column: IColumn<T> | Paths<T, 2>, index: number) {
    const col_obj = column as IColumn<T> | undefined;
    const borderInlineEnd =
      props.columns && index === props.columns.length - 1 ? undefined : S.main_border;

    return typeof getKey(column) === "string" ? (
      <td key={uuidv4()} style={{ width: col_obj?.width }}>
        <ColumnSearch
          column={column}
          data={filters.find((x) => x.ColumnName === getKey(column))}
          onSubmit={handleFilterChange}
          index={index}
          message={message}
        />
      </td>
    ) : (
      <td key={uuidv4()} style={{ width: col_obj?.width }}>
        <form style={{ height: 31, borderInlineEnd }} />
      </td>
    );
  }

  const renderColumnsSearch = () => {
    if (props.columns && props.columns.length > 0) return props.columns?.map(innerColumnSearch);
    else if (props.dataSource && props.dataSource.length > 0) {
      const columns = keyify(props.dataSource[0]) as Paths<T, 2>[];
      return columns.map(innerColumnSearch);
    }
    return null;
  };

  const scroll = () => {
    const tbody = tbodyRef.current;

    if (tbody && tbody.offsetHeight + tbody.scrollTop >= tbody.scrollHeight)
      props.scrolledToBottom && props.scrolledToBottom();
  };

  // const renderAdvancedFilter = () => {
  //   return (
  //     <S.AdvancedFilter>
  //       {props.selectionMode === "multiple" && renderMultipleSelection(false, -2)}
  //       <td className="main-column">
  //         <button>
  //           <HiOutlineFilter color={colors.primary} />
  //           <span>{message.advanced_filter_txt}</span>
  //         </button>
  //       </td>
  //     </S.AdvancedFilter>
  //   );
  // };

  return (
    <S.StyledTable {...props} hasScrolbar={visibleScrollbar}>
      <thead>
        <tr>
          {renderMultipleSelection(true, -1)}
          {columns("th", false)}
        </tr>
        {props.columnSearch && (
          <tr className="column-search">
            {renderMultipleSelection(false, -2)}
            {renderColumnsSearch()}
          </tr>
        )}
      </thead>
      <tbody ref={tbodyRef}>{rows()}</tbody>
      {/* <tfoot>{renderAdvancedFilter()}</tfoot> */}
    </S.StyledTable>
  );
}

export default DataGrid;
