import '@vaadin/icons/vaadin-icons';
import {LitElement, css, html} from 'lit';
import {config} from '../../config';
import '../app-container';
import '../app-grid-view';

export class EmployeeViewControls extends LitElement {
  static styles = css`
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
      color: var(--ing-secondary-color);
      background-color: var(--ing-background-color);
      border: none;
      border-radius: 0.25em;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    nav button.active {
      color: var(--ing-primary-color);
    }

    nav button vaadin-icon {
      max-width: 24px;
      pointer-events: none;
    }
  `;

  static properties = {
    title: {
      type: String,
      reflect: true,
    },
    active: {
      type: String,
      reflect: true,
    },
  };

  constructor() {
    super();
    this.title = 'Employee List';
    this.active = config.defaultListView;
  }

  _toggleView({target}) {
    const type = target.getAttribute('data-type');
    const event = new CustomEvent(`list-view`, {
      detail: {type},
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <header>
        <h2>${this.title}</h2>

        <nav>
          <button
            @click=${this._toggleView}
            data-type="list"
            class=${this.active === 'list' ? 'active' : ''}
          >
            <vaadin-icon icon="vaadin:lines-list"></vaadin-icon>
          </button>
          <button
            @click=${this._toggleView}
            data-type="grid"
            class=${this.active === 'grid' ? 'active' : ''}
          >
            <vaadin-icon icon="vaadin:grid-small"></vaadin-icon>
          </button>
        </nav>
      </header>
    `;
  }
}
customElements.define('app-employee-view-controls', EmployeeViewControls);
