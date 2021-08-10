import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    tr {
      border-bottom: 2px solid #ddd;
      th {
        height: 2.2rem;
      }
    }
  }
  tbody {
    tr {
      td {
        height: 1.8rem;
      }
    }
  }
  &.show-border {
    border: 1px solid #ddd;
  }
  &.show-row-lines {
    thead,
    tbody {
      tr {
        th,
        td {
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
  &.show-column-lines {
    thead,
    tbody {
      tr {
        th,
        td {
          border-right: 1px solid #ddd;
          &:first-child {
            border-right: none;
          }
        }
      }
    }
  }
  &.row-alternation-enabled {
    tbody {
      tr {
        &:nth-child(even) {
          background-color: #f5f5f5;
        }
      }
    }
  }
  .show-sort {
    position: relative;
    cursor: pointer;
    .sort-icon {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      margin-top: -0.5rem;
      color: #ddd;
    }
  }
`;