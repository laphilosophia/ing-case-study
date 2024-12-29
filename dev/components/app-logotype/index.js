import {LitElement, css, html} from 'lit';

export class AppLogotype extends LitElement {
  static styles = css`
    h1 {
      display: flex;
      align-items: center;
      gap: 1em;
      margin: 0;
      font-size: 1em;
    }

    h1 img {
      width: 32px;
      height: 32px;
    }
  `;

  render() {
    return html`
      <h1>
        <img src="/assets/logotype.svg" alt="ING Case Study" />
        <span>ING</span>
      </h1>
    `;
  }
}
customElements.define('app-logotype', AppLogotype);
