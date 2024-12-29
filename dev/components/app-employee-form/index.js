import '@vaadin/icons/vaadin-icons';
import {Router} from '@vaadin/router';
import {html} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import {v7 as uuid} from 'uuid';
import {router} from '../../..';
import {Database} from '../../utils/db.controller';
import {FormController} from '../../utils/form.controller';
import {LitElementI18N, t} from '../../utils/i18n.mixins';
import {formStyles} from './styles';

export class AppEmployeeForm extends LitElementI18N {
  static styles = [formStyles];

  static properties = {
    selected: {type: String, reflect: true},
  };

  location = router.location;

  constructor() {
    super();
    this.selected = null;
  }

  db = new Database(this);

  controller = new FormController(this, {
    onSubmit: async (values) => {
      if (this.selected) {
        const exist = await this.db.get(this.selected);
        if (exist) {
          await this.db.set(this.selected, values);

          if (location.pathname !== '/add') {
            this.dispatchEvent(new CustomEvent('dialog-close'));
            this.requestUpdate();
          } else {
            Router.go('/');
          }
        } else {
          return;
        }
      } else {
        const id = uuid();

        const payload = {
          id,
          ...values,
        };

        if (!payload.id) {
          return;
        }

        const exist = await this.db.get(payload.id);
        if (exist) {
          return;
        }

        await this.db.set(id, payload);

        Router.go('/');
      }
    },
    initialValues: {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.firstName) {
        errors.firstName = 'Please enter first name';
      }
      if (!values.lastName) {
        errors.lastName = 'Please enter last name';
      }
      if (!values.dateOfEmployment) {
        errors.dateOfEmployment = 'Please select an employment date';
      }
      if (!values.dateOfBirth) {
        errors.dateOfBirth = 'Please select a birthday';
      }
      if (!values.phone) {
        errors.phone = 'Please enter a phone number';
      }
      if (!values.email) {
        errors.email = 'Please enter an email';
      }
      if (!values.department) {
        errors.department = 'Please select a department';
      }
      if (!values.position) {
        errors.position = 'Please select a position';
      }

      return errors;
    },
  });

  async connectedCallback() {
    super.connectedCallback();

    if (this.selected) {
      const res = await this.db.get(this.selected);
      this.controller.form.initialize(res);
    }
  }

  renderErrorSpan(field) {
    const {touched, error} = this.controller.form.getFieldState(field) ?? {};
    return html`
      <span
        style=${styleMap({display: touched && error ? 'block' : 'none'})}
        class="error__message"
      >
        ${error}
      </span>
    `;
  }

  setErrorState(field) {
    const {touched, error} = this.controller.form.getFieldState(field) ?? {};
    return touched && error ? 'error' : '';
  }

  render() {
    const {form, register} = this.controller;
    const formState = form.getState();

    return html`
      <form
        id="form"
        @submit=${(e) => {
          e.preventDefault();
          form.submit();
        }}
      >
        <div class=${this.setErrorState('firstName')}>
          <label>${t('messages:fields.firstName')}</label>
          <input
            type="text"
            placeholder="${t('messages:fields.firstName')}"
            ${register('firstName', {required: true})}
          />
          ${this.renderErrorSpan('firstName')}
        </div>

        <div class=${this.setErrorState('lastName')}>
          <label>${t('messages:fields.lastName')}</label>
          <input
            type="text"
            placeholder="${t('messages:fields.lastName')}"
            ${register('lastName')}
          />
          ${this.renderErrorSpan('lastName')}
        </div>

        <div class=${this.setErrorState('dateOfEmployment')}>
          <label>${t('messages:fields.employmentDate')}</label>
          <input
            type="date"
            placeholder="${t('messages:fields.employmentDate')}"
            ${register('dateOfEmployment')}
          />
          ${this.renderErrorSpan('dateOfEmployment')}
        </div>

        <div class=${this.setErrorState('dateOfBirth')}>
          <label>${t('messages:fields.birthday')}</label>
          <input
            type="date"
            placeholder="${t('messages:fields.birthday')}"
            ${register('dateOfBirth')}
          />
          ${this.renderErrorSpan('dateOfBirth')}
        </div>

        <div class=${this.setErrorState('phone')}>
          <label>${t('messages:fields.phone')}</label>
          <input
            type="text"
            placeholder="${t('messages:fields.phone')}"
            ${register('phone')}
          />
          ${this.renderErrorSpan('phone')}
        </div>

        <div class=${this.setErrorState('email')}>
          <label>${t('messages:fields.email')}</label>
          <input
            type="email"
            placeholder="${t('messages:fields.email')}"
            ${register('email')}
          />
          ${this.renderErrorSpan('email')}
        </div>

        <div class=${this.setErrorState('department')}>
          <label>${t('messages:fields.department')}</label>
          <select ${register('department')}>
            <option value="" disabled>
              ${t('messages:fields.pleaseSelect')}
            </option>
            <option value="Development">Development</option>
            <option value="Analytics">Analytics</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Human Resource">Human Resource</option>
          </select>
          ${this.renderErrorSpan('department')}
        </div>

        <div class=${this.setErrorState('position')}>
          <label>${t('messages:fields.position')}</label>
          <select ${register('position')}>
            <option value="" disabled>
              ${t('messages:fields.pleaseSelect')}
            </option>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
            <option value="Staff">Staff</option>
            <option value="Principal">Principal</option>
          </select>
          ${this.renderErrorSpan('position')}
        </div>

        <nav>
          <button
            type="button"
            id="reset"
            class="reset"
            @click=${() => {
              form.restart();
            }}
          >
            ${t('messages:fields.reset')}
          </button>
          <button
            type="submit"
            class="submit"
            ?disabled=${formState.submitting}
          >
            ${t('messages:fields.submit')}
          </button>
        </nav>
      </form>
    `;
  }
}
// @ts-ignore
customElements.define('app-employee-form', AppEmployeeForm);
