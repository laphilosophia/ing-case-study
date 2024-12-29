import '@vaadin/icons/vaadin-icons';
import cookies from 'js-cookie';
import {css, html} from 'lit';
import {config} from '../../config';
import {LitElementI18N} from '../../utils/i18n.mixins';

export class AppLanguages extends LitElementI18N {
  static styles = css`
    select {
      padding: 0;
      border: 0;
      background-color: transparent;
      font-size: 1.5em;
      font-style: normal;
      cursor: pointer;
    }
  `;

  lang = cookies.get(config.langCookieName);

  constructor() {
    super();
    this.languageResources = '/assets/locales/{{lng}}/{{ns}}.json';
  }

  changeLanguages(event) {
    this.changeLanguage(event.target.value);
    cookies.set(config.langCookieName, event.target.value);
    this.requestUpdate();
  }

  render() {
    return html`
      <select @change="${this.changeLanguages}">
        <option value="en" ?selected="${this.lang === 'en'}">🇬🇧</option>
        <option value="tr" ?selected="${this.lang === 'tr'}">🇹🇷</option>
      </select>
    `;
  }
}
// @ts-ignore
customElements.define('app-languages', AppLanguages);
