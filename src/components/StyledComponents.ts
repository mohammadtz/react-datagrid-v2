import styled, { css } from "styled-components";
import { colorOp, getScrollbarWidth, trueUnit } from "../utils/utils";
import { colors } from "../utils/colors";
import { ITable } from "./StyledComponents.type";

const main_border = `1px solid ${colors.border}`;

export const StyledTable = styled.table<ITable>`
  width: 100%;
  border-collapse: collapse;
  border: ${(props) => props.visibleBorder && main_border};
  direction: ${(props) => (props.localization === "fa" ? "rtl" : "ltr")};
  height: ${(props) => trueUnit(props.height)};
  border:none;
  & thead,
  & tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    cursor: ${(props) => (props.selectionMode === "single" ? "pointer" : undefined)};
  }

  thead {
    width: ${(props) =>
    (props.maxHeight || props.height) && props.hasScrolbar ? `calc(100% - ${`${getScrollbarWidth()}px`})` : "100%"};
    margin-bottom: 8px;
    border-radius: 4px;
    display: block;
    tr {
      // border-bottom: 2px solid #ddd;
      display: table;
      width: 100%;
      table-layout: fixed;
      background-color: #e1e1e1;
      border-radius: 4px;
      height: 50px;
      margin-bottom: 8px;
      th {
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
          border-radius: 4px 0 0 4px;
          div {
            border-inline-end: none;
          }
        }
        :nth-child(1) {
          border-radius: 4px;
        }
      }
    }
  }
  thead tr td{
      :last-child {
       form{
         border-inline-end: none;
       }
        }
  }

  tbody {
    display: block;
    max-height: ${(props) => trueUnit(props.maxHeight)};
    height: calc(100% - 116px);
    overflow-y: auto;
    tr {
      background-color: #f4f4f4;
      margin-bottom: 8px;
      border-radius: 4px;
      height: 50px;
      td {
        height: 1.8rem;
        // border-bottom: ${(props) => props.visibleRowLines && main_border};
        .border {
          border-inline-end: 1px solid #cdcfd4;
          height: 60%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        :last-child {
          .border {
            border-inline-end: none;
          }
        }
      }
    }
  }

  ${(props) =>
    props.visibleColumnLines &&
    css`
      thead,
      tbody {
        tr {
          th,
          td {
            /* border-inline-end: ${main_border}; */
          }
        }
      }
    `}

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
          color: ${colors.border};
        }
      }
    `}
`;

export const StyledColumnSearch = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  border-inline-end: 1px solid #cdcfd4;

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
    min-width: 6rem;
    display: flex;
    flex-direction: column;
    text-align: start;
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
