import {css} from 'lit';

export const dialogStyles = css`
  :host {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
  }

  dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.25em;
    border: 0;
    width: 100%;
    max-width: 30em;
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
  }

  dialog header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    margin: 0;
    margin-block-end: 1em;
  }

  dialog header h3 {
    margin: 0;
    color: var(--ing-primary-color);
    font-weight: bold;
  }

  dialog header button {
    background: none;
    border: none;
    color: var(--ing-primary-color);
    font-size: 1.25em;
    cursor: pointer;
  }

  .content {
    position: relative;
    width: 100%;
    display: block;
    font-size: 0.875em;
    font-weight: 400;
    text-align: left;
  }

  dialog nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-block-start: 1em;
  }

  dialog nav {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.2em;
  }

  dialog nav button {
    display: block;
    width: 100%;
    font-weight: 700;
    color: var(--ing-background-color);
    padding: 0.75em 1.5em;
    margin: 0;
    border: 2px solid transparent;
    border-radius: 0.5em;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  dialog nav .submit {
    background-color: var(--ing-primary-color);
  }
  dialog nav .submit:hover {
    background-color: var(--ing-primary-hover-color);
  }

  dialog nav .close {
    color: var(--ing-text-color);
    border-color: var(--ing-secondary-color);
    background-color: transparent;
  }
  dialog nav .close:hover {
    border-color: var(--ing-primary-color);
    color: var(--ing-primary-color);
  }

  @media (max-width: 768px) {
    :host {
      justify-content: flex-start;
    }

    dialog {
      margin-block-start: 1em;
      max-width: calc(100% - 2em);
    }
  }
`;
