import {css} from 'lit';

export const formStyles = css`
  form {
    position: relative;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 1.5em;
  }

  form div {
    flex-basis: calc(50% - 0.75em);
    max-width: calc(50% - 0.75em);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  form div label {
    display: block;
    padding-inline: 0.75em;
    margin-block-end: 0.25em;
    color: var(--ing-placeholder-color);
    font-size: 0.75em;
    font-weight: 500;
  }

  form div input,
  form div select {
    display: block;
    padding-inline: 0.75em;
    width: 100%;
    height: 2.5em;
    border: 1px solid var(--ing-border-color);
    box-sizing: border-box;
    border-radius: 0.25em;
  }

  form nav {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2em;
  }

  form nav button {
    display: block;
    font-weight: 700;
    color: var(--ing-background-color);
    padding: 0.75em 1.5em;
    border: none;
    border-radius: 0.25em;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  form nav .submit {
    background-color: var(--ing-primary-color);
  }
  form nav .submit:hover {
    background-color: var(--ing-primary-hover-color);
  }

  form nav .reset {
    background-color: var(--ing-secondary-color);
  }
  form nav .reset:hover {
    background-color: var(--ing-secondary-hover-color);
  }

  .error input,
  .error select {
    border-color: red;
  }

  .error label {
    color: red;
  }

  .error__message {
    padding-inline-start: 0.75em;
    margin-block-start: 0.25em;
    color: red;
    font-size: 0.75em;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    form {
      gap: 1em;
    }

    form div {
      flex-basis: 100%;
      max-width: 100%;
    }

    form nav {
      justify-content: center;
    }

    form nav button {
      margin-block-start: 1em;
      padding: 0.75em 2em;
      width: 100%;
    }
  }
`;
