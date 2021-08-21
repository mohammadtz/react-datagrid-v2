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

  & thead,
  & tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead {
    width: ${(props) =>
      props.maxHeight && props.hasScrolbar ? `calc(100% - ${`${getScrollbarWidth()}px`})` : "100%"};
    tr {
      border-bottom: 2px solid #ddd;
      th {
        height: 2.2rem;
      }
    }
  }

  tbody {
    display: block;
    max-height: ${(props) => trueUnit(props.maxHeight)};
    overflow-y: auto;
    tr {
      td {
        height: 1.8rem;
        border-bottom: ${(props) => props.visibleRowLines && main_border};
      }
      &:nth-child(even) {
        background-color: ${(props) => props.rowAlternationEnabled && colors.rowAlternation};
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
            border-inline-end: ${main_border};
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
    left: 0;
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
  width: 100%;
  padding: 0.5rem;
  border: none;
  outline: none;
`;
