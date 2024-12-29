import {css} from 'lit';

export const appGridViewTableStyles = css`
  section {
    position: relative;
    width: 100%;
    display: block;
    box-sizing: border-box;
  }

  .view {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(33.33333333%, 1fr));
  }

  @media (max-width: 1024px) {
    .view {
      grid-template-columns: repeat(auto-fit, 50%);
      margin-inline: 0;
    }
  }

  @media (max-width: 980px) {
    .view {
      grid-template-columns: 100%;
      margin-inline: 0;
    }
  }
`;
