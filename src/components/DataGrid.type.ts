import { ReactNode } from "react";
import { ILocalization } from "../localization/render";
import { Paths } from "../utils/types";
import { ITable } from "./StyledComponents.type";

export interface IOnSelectionChanged<T> {
  selectedRow?: T;
  selectedRows?: T[];
}

export interface IDataGrid<T = any> extends ITable {
  /**
   ** columns: declare how to render and show datagrid columns
   ** for example:
   *
   * ```
   * columns={[
   *    {
   *      dataField: "id",
   *      ...
   *    }
   * ]}
   * ```
   * or
   * ```
   * columns={["id","name","age"}]}
   * ```
   * ...
   */
  columns?: IColumn<T>[];
  /**
   * * dataSoure: declare data of data-grid
   * * for example:
   * ```
   * dataSoure={[
   *    {
   *      id:1,
   *      name:"John",
   *      age: 28
   *      ...
   *    },
   *    ...
   * ]}
   * ```
   */
  dataSource?: T[];
  handleSort?: (e: ISort<T>) => void;
  handleRowFilter?: (e: FilterParams<T>[]) => void;
  localization?: ILocalization;
  scrolledToBottom?: () => void;
  style?: React.CSSProperties;
  className?: string;
  handleSelectionChanged?: (e: IOnSelectionChanged<T>) => void;
}

export interface IColumn<T = any> {
  /**
   * * dataField: take a key of dataSoure to show this data on the column position
   * * for Example:
   * ```
   * dataSoure={[
   *    {
   *      id:1,
   *      name:"John",
   *      age: 28
   *      ...
   *    },
   *    ...
   * ]}
   * columns={[
   *    {
   *      dataField: "id",
   *      ...
   *    },
   *    ...
   * ]}
   * ```
   */
  dataField?: Paths<T, 2>;
  caption?: string;
  customRender?: (data: T, index: number) => ReactNode;
  dataType?: IDataType;
  width?: string | number;
}

export type IElement = "th" | "td";

export interface ISort<T> {
  key?: Paths<T, 2>;
  desc?: boolean;
}

export interface FilterParams<T> {
  ColumnName?: Paths<T, 2>;
  FilterValue?: string | number | boolean | null;
  FilterOptions: FilterOptions;
}

export enum FilterOptions {
  StartsWith = 1,
  EndsWith,
  Contains,
  DoesNotContain,
  IsEmpty,
  IsNotEmpty,
  IsGreaterThan,
  IsGreaterThanOrEqualTo,
  IsLessThan,
  IsLessThanOrEqualTo,
  IsEqualTo,
  IsNotEqualTo,
}

export type IDataType = "boolean" | "number" | "string";

export interface IFilterTypeData {
  id: FilterOptions;
  text: string;
  active: boolean;
}
