import {css} from 'lit';

export const paginationStyles = css`
  .pagination {
    position: relative;
    margin-block-start: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75em;
    color: var(--ing-text-color);
    font-size: 0.875em;
  }

  .pagination div {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-weight: normal;
  }

  .pagination button {
    display: block;
    width: 2.5em;
    height: 2.5em;
    padding: 0;
    background: none;
    border-radius: 50%;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .pagination button[data-active='true'],
  .pagination button:not(:disabled):hover {
    background-color: var(--ing-primary-color);
    color: var(--ing-background-color);
  }
`;
