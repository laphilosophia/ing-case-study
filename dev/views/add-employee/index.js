import {html} from 'lit';
import '../../components/app-container';
import '../../components/app-employee-form';
import {LitElementI18N, t} from '../../utils/i18n.mixins';
import {addEmployeeStyles} from './styles';

export class AddEmployeeView extends LitElementI18N {
  static styles = [addEmployeeStyles];

  render() {
    return html`
      <app-container>
        <header>
          <h2>${t('messages:titles.addNewEmployee')}</h2>
        </header>
        <app-employee-form></app-employee-form>
      </app-container>
    `;
  }
}
// @ts-ignore
customElements.define('add-employee', AddEmployeeView);
