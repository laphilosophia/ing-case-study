import {LitElement, css, html} from 'lit';

export class AppIconButton extends LitElement {
  static properties = {
    icon: {
      type: String,
      reflect: true,
    },
    className: {
      type: String,
      reflect: true,
    },
  };

  static styles = css`
    button {
      display: block;
      width: 24px;
      height: 24px;
      padding: 4px;
      color: var(--ing-primary-color);
      background: none;
      border: none;
      box-sizing: border-box;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    button vaadin-icon {
      max-width: 16px;
      max-height: 16px;
      pointer-events: none;
      user-select: none;
    }

    button:hover {
      color: var(--ing-primary-hover-color);
    }
  `;

  constructor() {
    super();

    this.icon = '';
    this.className = '';
  }

  onClick() {
    this.dispatchEvent(new CustomEvent('app-button-click'));
    this.requestUpdate();
  }

  render() {
    return html`
      <button @click=${this.onClick} class="${this.className}">
        <vaadin-icon icon="${this.icon}"></vaadin-icon>
      </button>
    `;
  }
}
customElements.define('app-icon-button', AppIconButton);
