import '@vaadin/icons/vaadin-icons';
import {css, html} from 'lit';
import {LitElementI18N, t} from '../../utils/i18n.mixins';

export class AppNavigation extends LitElementI18N {
  static styles = css`
    nav {
      position: relative;
      display: flex;
      align-items: center;
      gap: 2em;
    }

    nav a {
      display: flex;
      align-items: center;
      gap: 0.5em;
      text-decoration: none;
      color: var(--ing-primary-color);
    }

    nav a vaadin-icon {
      max-width: 1em;
    }

    @media (max-width: 1024px) {
      nav {
        gap: 1em;
      }

      nav a {
        font-size: 0.875em;
      }

      nav a vaadin-icon {
        max-width: 0.875em;
      }
    }
  `;

  render() {
    return html`
      <nav>
        <a href="/" aria-label="${t('messages:navigation.employees')}">
          <vaadin-icon icon="${'vaadin:user'}"></vaadin-icon>
          <span>${t('messages:navigation.employees')}</span>
        </a>
        <a href="/add" aria-label="${t('messages:navigation.addEmployee')}">
          <vaadin-icon icon="${'vaadin:plus'}"></vaadin-icon>
          <span>${t('messages:navigation.addEmployee')}</span>
        </a>
      </nav>
    `;
  }
}
// @ts-ignore
customElements.define('app-navigation', AppNavigation);
