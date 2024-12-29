import {Task} from '@lit/task';
import '@vaadin/icons/vaadin-icons';
import cookies from 'js-cookie';
import {html} from 'lit';
import '../../components/app-container';
import '../../components/app-employee-view-controls';
import '../../components/app-grid-view';
import '../../components/app-list-view';
import {config} from '../../config';
import {Database} from '../../utils/db.controller';
import {LitElementI18N, t} from '../../utils/i18n.mixins';
import {employeeStyles} from './styles';

export class EmployeesView extends LitElementI18N {
  static styles = employeeStyles;

  viewType = cookies.get(config.viewCookieName) ?? config.defaultListView;
  db = new Database(this);
  // @ts-ignore
  collection = new Task(this, {
    task: async () => (await this.db.all()) || [],
    args: () => [],
  });

  connectedCallback() {
    super.connectedCallback();

    if (cookies.get(config.viewCookieName)) {
      this.viewType = cookies.get(config.viewCookieName) ?? 'grid';

      cookies.set(config.viewCookieName, this.viewType);
      this.requestUpdate();
    }
  }

  _setListView(e) {
    this.viewType = e.detail?.type;
    cookies.set(config.viewCookieName, this.viewType);
    this.requestUpdate();
  }

  _getListView(data) {
    if (this.viewType === 'list') {
      return html`<app-list-view .data="${data}"></app-list-view>`;
    } else {
      return html`<app-grid-view .data="${data}"></app-grid-view>`;
    }
  }

  render() {
    return html`
      <app-container>
        ${this.collection.render({
          initial: () => html`
            <app-employee-view-controls
              .active="${this.viewType}"
              .title="${t('messages:titles.waiting')}"
              @list-view="${this._setListView}"
            ></app-employee-view-controls>
          `,
          pending: () => html`
            <app-employee-view-controls
              .active="${this.viewType}"
              .title="${t('messages:titles.loading')}"
              @list-view="${this._setListView}"
            ></app-employee-view-controls>
          `,
          complete: (data) => html`
            <app-employee-view-controls
              .active="${this.viewType}"
              .title="${t('messages:titles.employeeList')}"
              @list-view="${this._setListView}"
            ></app-employee-view-controls>
            ${this._getListView(data)}
          `,
          error: (e) => html`
            <app-employee-view-controls
              .active="${this.viewType}"
              .title="${t('messages:titles.error', {error: e})}"
              @list-view="${this._setListView}"
            ></app-employee-view-controls>
          `,
        })}
      </app-container>
    `;
  }
}
// @ts-ignore
customElements.define('employees-view', EmployeesView);
