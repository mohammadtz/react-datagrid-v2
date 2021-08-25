import { ILocalization } from "../localization/render";

export interface IDatagridColorSchema {
  primary: string;
}

export interface ITable {
  visibleBorder?: boolean;
  visibleRowLines?: boolean;
  visibleColumnLines?: boolean;
  rowAlternationEnabled?: boolean;
  sortable?: boolean;
  maxHeight?: string | number;
  height?: string | number;
  localization?: ILocalization;
  hasScrolbar?: boolean;
  selectionMode?: "single" | "multiple";
  colorSchema?: IDatagridColorSchema;
}

export interface ITBody {}
