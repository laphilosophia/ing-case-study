import {css} from 'lit';

export const employeeStyles = css`
  header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block-end: 1.5em;
  }

  header h2 {
    margin: 0;
    color: var(--ing-primary-color);
    font-weight: 400;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  nav button {
    display: block;
    width: 2.5em;
    height: 2.5em;
    padding: 0;
    background: none;
    color: var(--ing-primary-color);
    border: none;
    cursor: pointer;
  }

  nav button vaadin-icon {
    max-width: 24px;
    pointer-events: none;
  }
`;
