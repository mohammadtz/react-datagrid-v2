import { ILocalization } from "../localization/render";

export interface ITable {
  visibleBorder?: boolean;
  visibleRowLines?: boolean;
  visibleColumnLines?: boolean;
  rowAlternationEnabled?: boolean;
  sortable?: boolean;
  maxHeight?: string | number;
  localization?: ILocalization;
  hasScrolbar?: boolean;
}

export interface ITBody {}
