import {css} from 'lit';

export const appGridItemViewStyles = css`
  article {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
    background-color: var(--ing-background-color);
    border: 3px solid var(--ing-body-color);
    border-radius: 0.25em;
  }

  hr {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--ing-border-color);
    border: none;
  }

  p {
    margin: 0;
    font-size: 0.75em;
  }

  p span,
  p strong {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
  }

  p span {
    width: 130px;
    margin-right: 0.5em;
  }

  p strong {
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }

  ::slotted(nav) {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 1em;
  }

  @media (max-width: 425px) {
    p strong {
      max-width: 200px;
    }
  }

  @media (max-width: 375px) {
    p strong {
      max-width: 150px;
    }
  }

  @media (max-width: 320px) {
    ::slotted(nav) {
      flex-direction: column;
    }

    p span {
      max-width: 110px;
    }
    p strong {
      max-width: 120px;
    }
  }
`;
