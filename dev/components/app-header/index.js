import {LitElement, css, html} from 'lit';
import '../app-languages';
import '../app-logotype';
import '../app-navigation';

export class AppHeader extends LitElement {
  static styles = css`
    :host {
      position: relative;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    header {
      position: relative;
      padding-inline: 1em;
      padding-block: 0.5em;
      background-color: var(--ing-background-color, #fff);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 1em;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 2em;
    }
  `;

  render() {
    return html`
      <header>
        <app-logotype></app-logotype>
        <nav>
          <app-navigation></app-navigation>
          <app-languages></app-languages>
        </nav>
      </header>
    `;
  }
}
customElements.define('app-header', AppHeader);
