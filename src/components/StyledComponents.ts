import styled, { css } from "styled-components";
import { getScrollbarWidth, trueUnit } from "../utils/utils";
import { colors } from "./colors";
import { ITable } from "./StyledComponents.type";

const main_border = `1px solid ${colors.border}`;

export const Table = styled.table<ITable>`
  width: 100%;
  border-collapse: collapse;
  border: ${(props) => props.showBorder && main_border};

  & thead,
  & tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead {
    width: ${(props) => (props.maxHeight ? `calc(100% - ${`${getScrollbarWidth()}px`})` : "100%")};
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
        border-bottom: ${(props) => props.showRowLines && main_border};
      }
      &:nth-child(even) {
        background-color: ${(props) => props.rowAlternationEnabled && colors.rowAlternation};
      }
    }
  }

  ${(props) =>
    props.showColumnLines &&
    css`
      thead,
      tbody {
        tr {
          th,
          td {
            border-right: ${main_border};
            &:first-child {
              border-right: none;
            }
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
