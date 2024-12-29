import {css} from 'lit';

export const appListViewTableStyles = css`
  section {
    position: relative;
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  table {
    position: relative;
    width: 100%;

    border-collapse: collapse;
    background-color: var(--ing-background-color);
    border: none;
    border-radius: 0.25em;
  }

  thead {
    border-bottom: 1px solid var(--ing-border-color);
  }

  th,
  td {
    display: table-cell;
    padding: 1.25em;
    text-align: left;
    vertical-align: baseline;
  }

  input[type='checkbox'] {
    display: inline-block;
    vertical-align: middle;
    width: 1.25em;
    height: 1.25em;
    margin: 0;
    border-radius: 0.5em;
    border-color: var(--ing-border-color);
  }

  nav {
    display: flex;
    align-items: center;
    gap: 0.75em;
  }

  nav button {
    display: block;
    width: 1.25em;
    height: 1.25em;
    padding: 0;
    background: none;
    color: var(--ing-primary-color);
    border: none;
    cursor: pointer;
  }

  nav button vaadin-icon {
    max-width: 16px;
    pointer-events: none;
  }

  tr:not(:last-of-type) {
    border-bottom: 1px solid var(--ing-border-color);
  }

  thead th {
    font-size: 0.75em;
    color: var(--ing-primary-color);
    white-space: nowrap;
  }

  tbody td {
    font-size: 0.75em;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }

  .page-controls {
    display: flex;
    gap: 10px;
    padding: 4px 0;
  }

  @media (max-width: 1024px) {
    table {
      table-layout: fixed;
      background-color: unset;
    }

    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    th,
    td {
      padding: 0.625em;
    }

    tr,
    td {
      display: block;
      white-space: nowrap;
      border-bottom: 1px solid var(--ing-border-color);
    }

    tr {
      margin-bottom: 1.25em;
      background-color: var(--ing-background-color);
    }

    tr td:first-of-type {
      display: none;
    }

    td::before {
      content: attr(data-label);
      width: 180px;
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;
