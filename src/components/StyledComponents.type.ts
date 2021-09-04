import { ILocalization } from "../localization/render";

export interface IDatagridColorSchema {
  primary: string;
}

export interface ITable {
  sortable?: boolean;
  maxHeight?: string | number;
  height?: string | number;
  localization?: ILocalization;
  hasScrolbar?: boolean;
  selectionMode?: "single" | "multiple";
  colorSchema?: IDatagridColorSchema;
  columnSearch?: boolean;
}

export interface ITBody {}
