import '@vaadin/icons/vaadin-icons';
import {html} from 'lit';
import {LitElementI18N, t} from '../../utils/i18n.mixins';
import {appGridItemViewStyles} from './styles';

export class AppGridItemView extends LitElementI18N {
  static styles = [appGridItemViewStyles];

  static properties = {
    firstName: {
      type: String,
      reflect: true,
    },
    lastName: {
      type: String,
      reflect: true,
    },
    dateOfEmployment: {
      type: String,
      reflect: true,
    },
    dateOfBirth: {
      type: String,
      reflect: true,
    },
    phone: {
      type: String,
      reflect: true,
    },
    email: {
      type: String,
      reflect: true,
    },
    department: {
      type: String,
      reflect: true,
    },
    position: {
      type: String,
      reflect: true,
    },
  };

  constructor() {
    super();

    this.firstName = '';
    this.lastName = '';
    this.dateOfEmployment = '';
    this.dateOfBirth = '';
    this.phone = '';
    this.email = '';
    this.department = '';
    this.position = '';
  }

  _dateFormatter(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date));
  }

  render() {
    return html`
      <article>
        <div>
          <p>
            <span>${t('messages:fields.fullName')}:</span>
            <strong>${this.firstName} ${this.lastName}</strong>
          </p>
          <p>
            <span>${t('messages:fields.birthday')}:</span>
            <strong>${this._dateFormatter(this.dateOfBirth)}</strong>
          </p>

          <hr />

          <p>
            <span>${t('messages:fields.employmentDate')}:</span>
            <strong>${this._dateFormatter(this.dateOfEmployment)}</strong>
          </p>
          <p>
            <span>${t('messages:fields.position')}:</span>
            <strong>${this.position}</strong>
          </p>
          <p>
            <span>${t('messages:fields.department')}:</span>
            <strong>${this.department}</strong>
          </p>

          <hr />

          <p>
            <span>${t('messages:fields.email')}:</span>
            <strong>${this.email}</strong>
          </p>
          <p>
            <span>${t('messages:fields.phone')}:</span>
            <strong>${this.phone}</strong>
          </p>
        </div>

        <slot name="control"></slot>
      </article>
    `;
  }
}
// @ts-ignore
customElements.define('app-grid-item-view', AppGridItemView);
