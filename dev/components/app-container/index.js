import {LitElement, css, html} from 'lit';

export class AppContainer extends LitElement {
  static styles = css`
    main {
      position: relative;
      max-width: 100%;
      padding-block: 2em;
      padding-inline: 20px;
      margin-inline: auto;
    }

    @media (min-width: 760px) {
      main {
        max-width: 720px;
      }
    }

    @media (min-width: 980px) {
      main {
        max-width: 920px;
      }
    }

    @media (min-width: 1024px) {
      main {
        max-width: 984px;
      }
    }

    @media (min-width: 1280px) {
      main {
        max-width: 1240px;
      }
    }

    @media (min-width: 1440px) {
      main {
        max-width: 86%;
        padding-inline: 0;
      }
    }
  `;

  render() {
    return html`
      <main>
        <slot></slot>
      </main>
    `;
  }
}
customElements.define('app-container', AppContainer);
