import styled, { css } from "styled-components";
import { colorOp, getScrollbarWidth, trueUnit } from "../utils/utils";
import { colors } from "../utils/colors";
import { ITable } from "./StyledComponents.type";

export const main_border = `1px solid ${colors.border}`;
export const selectedBorder = `1px solid ${colors.secondary}`;
export const selectRowSize = "1px";
export const multipleSelectionColumnWidth = "3rem";

export const borderRadiusRow = (isEnd?: boolean) => {
  let value = "0 4px 4px 0";
  if (isEnd) value = "4px 0 0 4px";
  return {
    "border-radius": value,
  };
};

export const StyledTable = styled.table<ITable>`
  width: 100%;
  direction: ${(props) => (props.localization === "fa" ? "rtl" : "ltr")};
  height: ${(props) => trueUnit(props.height)};
  transition: 0.3s all;
  border-collapse: collapse;

  tbody tr {
    cursor: ${(props) => (props.selectionMode === "single" ? "pointer" : undefined)};
  }

  thead {
    width: ${(props) =>
      (props.maxHeight || props.height) && props.hasScrolbar
        ? `calc(100% - ${`${getScrollbarWidth()}px`})`
        : "100%"};
    margin-bottom: 8px;
    display: block;
    tr {
      height: 3rem;
      margin-bottom: 8px;
      th {
        background-color: ${colors.theadBgColor};
        height: 2.2rem;
        font-weight: 400;
        div {
          border-inline-end: 1px solid #cdcfd4;
          height: 60%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        :last-child {
          div {
            border-inline-end: none;
          }
        }
      }
      td {
        :last-child {
          form {
            border-inline-end: none;
          }
        }
      }
    }
  }

  tbody {
    display: block;
    max-height: ${(props) => trueUnit(props.maxHeight)};
    height: calc(100% - 116px);
    overflow-y: auto;
    tr {
      margin-bottom: 8px;
      border-radius: 4px;
      height: 50px;
      td {
        background-color: ${colors.rowColor};
        height: 1.8rem;
        border: none;
        .border {
          border-inline-end: 1px solid #cdcfd4;
          height: 60%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        :last-child {
          div {
            border-inline-end: none;
          }
          .border {
            border-inline-end: none;
          }
        }
      }
    }
  }

  tfoot {
    width: ${(props) =>
      (props.maxHeight || props.height) && props.hasScrolbar
        ? `calc(100% - ${`${getScrollbarWidth()}px`})`
        : "100%"};
    margin-top: 8px;
    display: block;
    tr {
      height: 3rem;
    }
  }

  .td-inner {
    height: 100%;
    background-color: ${colors.rowColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .selected-border {
    td {
      background-color: ${colors.secondary};
      padding-top: ${selectRowSize};
      padding-bottom: ${selectRowSize};
      :first-child {
        background-color: ${(props) =>
          props.selectionMode === "multiple" ? "transparent" : undefined};
        padding-inline-start: ${(props) =>
          props.selectionMode !== "multiple" ? selectRowSize : undefined};
        .td-inner {
          ${(props) => (props.selectionMode !== "multiple" ? borderRadiusRow() : undefined)}
        }
      }
      :nth-child(2) {
        padding-inline-start: ${(props) =>
          props.selectionMode === "multiple" ? selectRowSize : undefined};
        .td-inner {
          ${(props) => (props.selectionMode === "multiple" ? borderRadiusRow() : undefined)}
        }
      }
      :last-child {
        padding-inline-end: ${selectRowSize};
        .td-inner {
          ${(props) => (props.selectionMode === "multiple" ? borderRadiusRow(true) : undefined)}
        }
      }
    }
  }

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    td,
    th {
      :last-child {
        ${borderRadiusRow(true)};
      }
      :first-child {
        ${(props) =>
          (props.selectionMode !== "multiple" || !props.selectionMode) && borderRadiusRow()};
        ${(props) =>
          props.selectionMode === "multiple" &&
          css`
            ${borderRadiusRow()}
            background-color: transparent;
          `};
      }
      :nth-child(2) {
        ${(props) => props.selectionMode === "multiple" && borderRadiusRow()};
      }
    }
  }

  .column-search {
    td {
      background-color: white;
    }
  }

  ${(props) =>
    props.sortable &&
    css`
      .show-sort {
        position: relative;
        cursor: pointer;
        .sort-icon {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          margin-top: -0.5rem;
          color: ${colors.gray};
        }
      }
    `}
`;

export const StyledColumnSearch = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  border-inline-end: 1px solid #cdcfd4;
  height: 31px;

  input {
    width: 100%;
    border: none;
    outline: none;
    padding-inline-start: 0.5rem;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const StyledSelectFilterType = styled.div`
  position: relative;
  .icon {
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: ${colors.border};
    }
  }
  .drop-down {
    position: absolute;
    /* left: 0; */
    background-color: ${colors.white};
    box-shadow: 2px 2px 5px 3px ${colorOp(colors.black, "15%")};
    min-width: 7rem;
    display: flex;
    flex-direction: column;
    text-align: start;
    max-height: 10rem;
    overflow-y: auto;
    & > div {
      padding-inline-start: 0.7rem;
      padding-block: 0.25rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${colors.border};
      :hover {
        background-color: ${colors.rowAlternation};
      }
      :last-child {
        border-bottom: none;
      }
    }
  }
`;

export const StyledSelect = styled.select`
  margin: 0 4px;
  width: 100%;
  padding: 0.5rem;
  border: none;
  outline: none;

  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='20' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z' fill='rgb(149, 165, 166)'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 0;
  background-position-y: 5px;
`;

export const MulipleSelectionColumn = styled.td`
  width: ${multipleSelectionColumnWidth};
  background-color: transparent;
`;

export const AdvancedFilter = styled.tr`
  .main-column {
    background-color: ${colors.theadBgColor};
    border-radius: 4px !important;
    padding-inline-start: 1rem;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      text-decoration: underline;
      color: ${colors.primary};
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1rem;
      span {
        padding-inline-start: 0.2rem;
      }
    }
  }
`;
