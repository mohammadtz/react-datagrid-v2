import { ReactNode } from "react";
import { ITable } from "./StyledComponents.type";

export interface IProps<T = any> extends ITable {
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
  columns?: (IColumn<T> | keyof T)[];
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
  dataField?: keyof T;
  caption?: string;
  customRender?: (data: T) => ReactNode;
}

export type IElement = "th" | "td";

export interface ISort<T> {
  key: keyof T;
  desc?: boolean;
}
